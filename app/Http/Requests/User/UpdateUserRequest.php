<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ["sometimes","string", "max:255"],
            "username" => ["sometimes","string", "max:255", "unique:users,username," . $this->user()->id],
            "email" => ["sometimes","string", "email", "max:255", "unique:users,email," . $this->user()->id],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            "name.string" => "El nombre debe ser un texto",
            "name.max" => "El nombre debe tener menos de 255 caracteres",
            "username.string" => "El username debe ser un texto",
            "username.max" => "El username debe tener menos de 255 caracteres",
            "username.unique" => "Este nombre de usuario ya se encuentra registrado",
            "email.string" => "El email debe ser un texto",
            "email.email" => "El email debe ser un correo electrónico",
            "email.max" => "El email debe tener menos de 255 caracteres",
            "email.unique" => "Este email ya se encuentra registrado",
        ];
    }
}
