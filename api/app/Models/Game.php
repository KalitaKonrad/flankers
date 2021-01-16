<?php

namespace App\Models;

use App\Events\GameFinished;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'type',
        'rated',
        'public',
        'bet',
        'duration',
        'long',
        'lat',
        'squad_size',
        'created_at'
    ];

    protected $appends = [
        'location'
    ];

    protected $casts = [
        'owner_id' => 'integer',
        'rated' => 'boolean',
        'public' => 'boolean',
        'duration' => 'integer',
        'bet' => 'float',
        'long' => 'float',
        'lat' => 'float',
        'completed' => 'boolean',
        'start_date' => 'integer'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    /**
     * Return squads registered to the game
     *
     * @return HasMany
     */
    public function squads()
    {
        return $this->hasMany(Squad::class);
    }

    /**
     * Return player memos related to the class
     *
     * @return HasMany
     */
    public function memos()
    {
        return $this->hasMany(Memo::class);
    }

    /**
     * Return invite related to game
     */
    public function invite()
    {
        return $this->hasOne(GameInvite::class);
    }

    /**
     * Ends the game
     */
    public function end()
    {
        if ($this->completed) {
            return;
        }

        $this->completed = true;
        $this->save();
        $this->invite()->delete();

        GameFinished::dispatch($this);
    }

    public function description()
    {
        return $this->with('squads', 'squads.members', 'invite')->find($this->id);
    }

    /**
     * Return players registered to the game
     *
     * @return Collection
     */
    public function getPlayersAttribute()
    {
        return $this->squads()->with('members')->get()->pluck('members')->flatten();
    }

    /**
     * Return concatenated game coordinates
     *
     * @return Collection
     */
    public function getLocationAttribute()
    {
        return "{$this->long},{$this->lat}";
    }
}
