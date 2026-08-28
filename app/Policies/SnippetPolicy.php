<?php

namespace App\Policies;

use App\Models\Snippet;
use App\Models\User;

class SnippetPolicy
{
    public function view(User $user, Snippet $snippet): bool
    {
        return $snippet->visibility === 'public'
            || $snippet->user_id === $user->id;
    }

    public function update(User $user, Snippet $snippet): bool
    {
        return $snippet->user_id === $user->id;
    }

    public function delete(User $user, Snippet $snippet): bool
    {
        return $snippet->user_id === $user->id;
    }
}
