<?php

namespace App\Models;

use App\Events\UserLeftSquad;
use App\Events\UserJoinedSquad;
use App\Events\UserAccessesSquad;
use App\Exceptions\SquadFullException;
use Illuminate\Database\Eloquent\Model;
use App\Exceptions\MatchAlreadyJoinedException;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Squad extends Model
{
    use HasFactory;

    protected $fillable = ['game_id', 'slots'];

    protected $appends = ['is_full'];

    protected $casts = [
        'game_id' => 'integer',
        'slots' => 'integer'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    /**
     * Model users relation alias, defining later
     * relation firsts makes it compatible with
     * factory magic methods, eg. hasUsers
     *
     * @return BelongsToMany
     */
    public function members()
    {
        return $this->users();
    }

    /**
     * Return all squad members
     *
     * @return BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(User::class)
            ->using(SquadUser::class);
    }

    /**
     * Return game to which squad was assigned
     *
     * @return BelongsTo
     */
    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    /**
     * If squad game is for teams, it will
     * can have team assigned.
     *
     * @return BelongsTo
     */
    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * Add user to the squad, if possible
     *
     * @throws SquadFullException
     * @throws MatchAlreadyJoinedException
     * @return void
     */
    public function assign(User $user)
    {
        $this->try($user);

        $this->members()->attach($user->id);

        UserJoinedSquad::dispatch($this, $user);
    }

    /**
     * Remove user from squad if possible
     *
     * @throws ModelNotFoundException
     * @return void
     */
    public function kick($user)
    {
        $this->members()->findOrFail($user->id);

        $this->members()->detach([$user->id]);

        UserLeftSquad::dispatch($this, $user);
    }

    /**
     * Check if user can join the squad
     *
     * @throws SquadFullException
     * @throws MatchAlreadyJoinedException
     * @return void
     */
    public function try(User $user)
    {
        UserAccessesSquad::dispatch($this, $user);

        if ($this->is_full) {
            throw new SquadFullException;
        }

        if ($this->members()->find($user->id)) {
            throw new MatchAlreadyJoinedException;
        }
    }

    /**
     * Return whether this squad has empty slots
     *
     * @return Collection
     */
    public function getIsFullAttribute()
    {
        return $this->members()->count() == $this->slots;
    }
}
