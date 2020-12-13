<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGameRequest extends FormRequest
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
            'duration' => 'integer',
            'completed' => 'boolean',
            'start_date' => 'timestamp',
            'long' => 'between:-180:180',
            'lat' => 'between:-90,90'
        ];
    }
}
