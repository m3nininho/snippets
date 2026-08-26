<?php

namespace App\Http\Requests;

use App\Models\Collection;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCollectionRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:1000'],
            'color' => ['required', 'string', Rule::in(Collection::COLORS)],
        ];
    }
}
