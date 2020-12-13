<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Squad extends Model
{
    use HasFactory;

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
}
