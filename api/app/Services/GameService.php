<?php

namespace App\Services;

use App\Constants\GameType;
use App\Models\Game;
use App\Models\Memo;
use App\Models\Team;
use App\Structures\GameScore;
use Chovanec\Rating\Rating;
use Illuminate\Support\Arr;

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
        $score = self::appraise($game);
        $squads = $game->squads()->get();
        $teams = $squads->each(fn ($squad) => Team::find($squad->team_id));
        $modifiers = [];

        if (count($score->winners) > 1) {
            $modifiers = [Rating::DRAW, Rating::DRAW];
        } else {
            $modifiers = $squads->each(
                fn ($squad) => Arr::has($score->winners, [$squad->id]) ? Rating::WIN : Rating::LOST
            );
        }

        $change = (new Rating($teams[0]->elo, $teams[1]->elo, $modifiers[0], $modifiers[1]))->getNewRatings();
        $teams[0]->elo = $change['a'];
        $teams[1]->elo = $change['b'];
        $teams->each(fn ($team) => $team->save());
    }

    protected static function squareFfaGame($game)
    {
    }
}
