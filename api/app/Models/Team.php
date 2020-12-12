<?php

namespace App\Models;

use Mpociot\Teamwork\TeamworkTeam;

class Team extends TeamworkTeam
{
    protected $fillable = ['owner_id', 'name', 'description', 'avatar'];

    public function members()
    {
        return $this->belongsToMany(User::class);
    }
}
