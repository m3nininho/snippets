<?php

namespace App\Http\Requests;

use App\Models\Collection;
use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddCollectionSnippetsRequest extends FormRequest
{
    public function authorize(): bool
    {
        $collection = $this->route('collection');

        return $collection instanceof Collection
            && $this->user()?->can('update', $collection);
    }

    public function rules(): array
    {
        return [
            'snippet_ids' => ['required', 'array', 'min:1'],
            'snippet_ids.*' => [
                'integer',
                'distinct',
                Rule::exists('snippets', 'id')->where(function (Builder $query) {
                    $query
                        ->where('user_id', $this->user()->id)
                        ->whereNull('deleted_at');
                }),
            ],
        ];
    }
}
