<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;

class ResetPasswordRequest extends FormRequest
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
            //
            "new_password" => ["required","string","min:8"],
            "new_password_confirmation" => ["required","string","min:8", "confirmed:new_password"],
        ];
    }

    public function messages()
    {
        return [
            "new_password.required" => "La nueva contraseña es requerida",
            "new_password.min" => "La nueva contraseña debe tener al menos 8 caracteres",
            "new_password_confirmation.required" => "La confirmación de la nueva contraseña es requerida",
            "new_password_confirmation.min" => "La confirmación de la nueva contraseña debe tener al menos 8 caracteres",
            "new_password_confirmation.confirmed" => "La confirmación de la nueva contraseña no coincide",
        ];
    }
}
