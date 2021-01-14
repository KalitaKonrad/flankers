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
     * @var array
     */
    protected $appends = [
        'versioned_avatar'
    ];


    /**
     * Return all users belonging to this team
     */
    public function members()
    {
        return $this->belongsToMany(User::class);
    }

    public function getVersionedAvatarAttribute()
    {

        $query = parse_url($this->avatar, PHP_URL_QUERY);
        $result = $this->avatar;

        if ($query) {
            $result .= '&v=' . $this->updated_at->timestamp;
        } else {
            $result .= '?v=' . $this->updated_at->timestamp;
        }

        return $result;
    }

    /**
     * Return path where team avatar should be stored
     *
     * @return string
     */
    public function avatarPath()
    {
        return 'avatars/teams/' . $this->id . '.jpg';
    }

    /**
     * Get default avatar url
     *
     * @return string
     */
    public function defaultAvatar()
    {
        return 'https://eu.ui-avatars.com/api/?format=png&name=flankers';
    }
}
