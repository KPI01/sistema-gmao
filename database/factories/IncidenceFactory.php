<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Incidence;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Incidence>
 */
class IncidenceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $is_validated = $this->faker->boolean;
        $is_closed = $this->faker->boolean;

        return [
            'creator_id' => User::inRandomOrder()->first()->id ?? null,
            'assigned_to_id' => User::inRandomOrder()->first()->id ?? null,
            'origin' => $this->faker->randomElement(['Teléfono', 'Parte']),
            'notifier' => $this->faker->name,
            'description' => $this->faker->paragraph,
            'priority' => $this->faker->randomDigit(),
            'observations' => $this->faker->optional()->sentence,
            'is_validated' => $is_validated,
            'validated_at' => $is_validated ? $this->faker->dateTimeThisYear() : null,
            'is_closed' => $is_closed,
            'closed_at' => $is_closed ? $this->faker->dateTimeThisYear() : null,
        ];
    }
}
