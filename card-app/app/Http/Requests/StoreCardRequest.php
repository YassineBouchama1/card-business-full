<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreCardRequest extends FormRequest
{
    public function authorize()
    {
        // check if user is authenticated
        return Auth::check();
    }

    public function rules()
    {

        $rules = [
            'name' => ['required', 'max:70'],
            'title' => ['required', 'max:70'],
            'company' => ['required', 'max:70'],
            'contact' => ['required', 'max:70'],
        ];

        // uf updating, make  fields optional
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules['name'] = ['sometimes', 'max:70'];
            $rules['title'] = ['sometimes', 'max:70'];
            $rules['company'] = ['sometimes', 'max:70'];
            $rules['contact'] = ['sometimes', 'max:70'];
        }

        return $rules;
    }
}
