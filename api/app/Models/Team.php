<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mpociot\Teamwork\TeamworkTeam;

class Team extends TeamworkTeam
{
    use HasFactory;

    /**
     * @var array
     */
    protected $fillable = ['owner_id', 'name', 'description', 'avatar'];

    /**
     * @var array
     */
    protected $casts = [
        'elo' => 'integer',
    ];

    /**
     * Return all users belonging to this team
     */
    public function members()
    {
        return $this->belongsToMany(User::class);
    }
}
