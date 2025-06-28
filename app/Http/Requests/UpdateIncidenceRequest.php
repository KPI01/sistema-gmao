<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateIncidenceRequest extends FormRequest
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
            "description" => ["required", "string", "max:255", "min:3"],
            "observations" => ["nullable", "string", "max:255"],
            "priority" => ["required", "integer", "min:1", "max:10"],
            "assigned_to_id" => ["nullable", "exists:users,id"],
        ];
    }

    public function messages(): array
    {
        return [
            "description.required" => "La descripción es requerida",
            "description.string" => "La descripción debe ser un texto",
            "description.max" => "La descripción no puede exceder los 255 caracteres",
            "description.min" => "La descripción debe tener al menos 3 caracteres",
            "observations.string" => "Las observaciones deben ser un texto",
            "observations.max" => "Las observaciones no pueden exceder los 255 caracteres",
            "priority.required" => "La prioridad es requerida",
            "priority.string" => "La prioridad debe ser numérica",
            "priority.min" => "La prioridad no puede ser menor que 1",
            "priority.max" => "La prioridad no puede ser mayor a 10",
            "assigned_to_id.exists" => "El usuario asignado no existe",
            "assigned_to_id.integer" => "El usuario asignado debe ser un número entero",
        ];
    }
}
