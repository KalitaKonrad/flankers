<?php

namespace App\Models;

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
        'lat'
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
     * Ends the game
     */
    public function end()
    {
        if ($this->completed) {
            return;
        }

        $this->completed = true;
        $this->save();
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
