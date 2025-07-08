<?php

namespace App\Http\Requests\User;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can("create", User::first());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ["required","string", "max:255"],
            "username" => ["required","string", "max:255", "unique:users,username"],
            "email" => ["required","string", "email", "max:255", "unique:users,email"],
            "password" => ["required","string", "min:8", "confirmed"],
        ];
    }

    public function messages(): array
    {
        return [
            "name.required" => "El nombre es obligatorio",
            "name.string" => "El nombre debe ser un texto",
            "name.max" => "El nombre debe tener menos de 255 caracteres",
            "username.required" => "El username es obligatorio",
            "username.string" => "El username debe ser un texto",
            "username.max" => "El username debe tener menos de 255 caracteres",
            "username.unique" => "Este username ya se encuentra registrado",
            "email.required" => "El email es obligatorio",
            "email.string" => "El email debe ser un texto",
            "email.email" => "El email debe ser un correo",
            "email.max" => "El email debe tener menos de 255 caracteres",
            "email.unique" => "Este email ya se encuentra registrado",
            "password.required" => "La contraseña es obligatoria",
            "password.string" => "La contraseña debe ser un texto",
            "password.min" => "La contraseña debe tener al menos 8 caracteres",
        ];
    }
}
