<?php

namespace App\Services;

use App\Rating;
use App\Models\User;
use App\Models\Game;
use App\Models\Memo;
use App\Models\Team;
use App\Models\Squad;
use App\Constants\GameType;
use App\Structures\GameScore;
use App\Structures\GameRankingEntry;

class GameService
{

    public static function appraise(Game $game): GameScore
    {
        $squads = $game->squads()->get();
        $scores = [];

        $squads->each(function ($squad) use (&$scores) {
            $scores[$squad->id] = Memo::where('winning_squad', $squad->id)->count();
        });

        $maxScore = max($scores);
        $winners = array_keys($scores, $maxScore);
        $tie = count($winners) > 1;

        return new GameScore([
            'scores' => $scores,
            'winners' => $winners,
            'tie' => $tie
        ]);
    }

    public function winners(Game $game)
    {
        return self::appraise($game)->winners;
    }

    public static function square($game)
    {
        switch ($game->type) {
            case GameType::TEAM:
                self::squareTeamGame($game);
                break;
            case GameType::FREE_FOR_ALL:
                self::squareFfaGame($game);
                break;
        }
    }

    protected static function squareTeamGame($game)
    {
        $results = self::appraise($game);
        $entries = [];

        foreach ($results->scores as $squadId => $score) {
            $instance = Squad::find($squadId)->team;
            $entries[] = new GameRankingEntry([
                'instance' => $instance,
                'id' => $instance->id,
                'elo' => $instance->elo,
                'isWinner' => in_array($squadId, $results->winners)
            ]);
        }

        self::applyEloChanges(
            self::getEloChanges($entries),
            Team::class
        );
    }


    protected static function squareFfaGame($game)
    {
        $results = self::appraise($game);
        $entries = [];

        foreach ($results->scores as $squadId => $score) {
            $members = Squad::find($squadId)->members()->get();
            $isWinner = in_array($squadId, $results->winners);

            foreach ($members as $member) {
                $entries[] = new GameRankingEntry([
                    'instance' => $member,
                    'id' => $member->id,
                    'elo' => $member->elo,
                    'isWinner' => $isWinner
                ]);
            }
        }


        self::applyEloChanges(
            self::getEloChanges($entries),
            User::class
        );
    }

    protected static function applyEloChanges(array $changes, string $model)
    {
        foreach ($changes as $id => $change) {
            $instance = $model::find($id);
            $instance->elo += $change;
            $instance->save();
        }
    }

    protected static function getEloChanges(array $entries)
    {
        $changes = [];

        while (count($entries) > 0) {
            $player = array_shift($entries);
            foreach ($entries as $opponent) {
                $eloChanges = self::getEloChange($player, $opponent);
                array_map(function ($player, $eloChange) use (&$changes) {
                    if (!array_key_exists($player->id, $changes)) {
                        $changes[$player->id] = intval($eloChange);
                    } else {
                        $changes[$player->id] += intval($eloChange);
                    }
                }, [$player, $opponent], $eloChanges);
            }
        }

        return self::normalizeEloChanges($changes);
    }

    protected static function getEloChange(GameRankingEntry $player, GameRankingEntry $opponent)
    {
        $operators = [];
        $operatorMap = [Rating::LOST, Rating::WIN];

        switch ([$player->isWinner, $opponent->isWinner]) {
            case [true, true]:
                $operators = [Rating::DRAW, Rating::DRAW];
                break;
            case [false, false]:
                return [0, 0];
            default:
                $operators = [
                    $operatorMap[$player->isWinner],
                    $operatorMap[$opponent->isWinner]
                ];
        }

        $elos = (new Rating($player->elo, $opponent->elo, ...$operators))->getNewRatings();
        return [
            $elos['a'] - $player->elo,
            $elos['b'] - $opponent->elo
        ];
    }

    protected static function normalizeEloChanges($changes)
    {
        $factor = (count($changes) / 2);

        if ($factor == 0) {
            return $changes;
        }

        foreach ($changes as $id => $change) {
            $changes[$id] = intval($changes[$id] / $factor);
        }

        return $changes;
    }
}
