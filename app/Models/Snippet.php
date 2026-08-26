<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Snippet extends Model
{
    use SoftDeletes;

    protected static function booted(): void
    {
        static::deleting(function (Snippet $snippet) {
            $snippet->collections()->detach();
        });
    }

    protected function casts(): array
    {
        return [
            'deleted_at' => 'datetime',
        ];
    }

    protected $fillable = [
        'user_id',
        'language_id',
        'title',
        'description',
        'code',
        'visibility',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function language()
    {
        return $this->belongsTo(Language::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites')->withTimestamps();
    }

    public function collections()
    {
        return $this->belongsToMany(Collection::class)->withTimestamps();
    }
}
