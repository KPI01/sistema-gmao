<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateIncidenceValidationRequest extends FormRequest
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
            "is_validated" => ["required", "boolean"],
        ];
    }

    public function messages(): array
    {
        return [
            "is_validated.required" => "El estado de la incidencia es requerido",
            "is_validated.boolean" => "El estado de la incidencia debe ser verdadero o falso",
        ];
    }
}
