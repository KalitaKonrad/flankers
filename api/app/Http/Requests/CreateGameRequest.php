<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateGameRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'type' => 'in:public,private',
            'rated' => 'boolean',
            'public' => 'boolean',
            'bet' => 'numeric',
            'start_date' => 'timestamp',
            'duration' => 'integer',
            'long' => 'between:-180,180|nullable',
            'lat' => 'between:-90,90|nullable'
        ];
    }
}
