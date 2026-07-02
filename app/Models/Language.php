<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'icon',
        'color',
    ];

    public function snippets()
    {
        return $this->hasMany(Snippet::class);
    }
}
