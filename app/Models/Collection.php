<?php

namespace App\Models;

use Database\Factories\CollectionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    /** @use HasFactory<CollectionFactory> */
    use HasFactory;

    public const COLORS = [
        'cyan',
        'blue',
        'violet',
        'red',
        'emerald',
        'amber',
        'pink',
    ];

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'color',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function snippets()
    {
        return $this->belongsToMany(Snippet::class)->withTimestamps();
    }
}
