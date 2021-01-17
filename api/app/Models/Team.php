<?php

namespace App\Models;

use Mpociot\Teamwork\TeamworkTeam;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Team extends TeamworkTeam
{
    use HasFactory;

    protected $fillable = ['owner_id', 'name', 'description', 'avatar'];

    protected $casts = [
        'elo' => 'integer',
    ];

    protected $appends = [
        'versioned_avatar'
    ];

    /**
     * Return all users belonging to this team
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function members()
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Return avatar url with version query for cache control
     *
     * @return string
     */
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
