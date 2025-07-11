<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Asset>
 */
class AssetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $doDescription = fake()->boolean();
        $doBrand = fake()->boolean(80);
        $doModel = fake()->boolean(80);
        $doSerialNumber = fake()->boolean(80);
        $doManufacturer = fake()->boolean(65);
        $doObservations = fake()->boolean();

        return [
            "asset_code" => fake()->unique()->regexify('[A-Z]{3}-[0-9]{3}-[A-Z]{3}'),
            "name" => fake()->words(2, true),
            "description" => $doDescription ? fake()->sentence() : null,
            "brand" => $doBrand ? fake()->company() : null,
            "model" => $doModel ? fake()->company() : null,
            "serial_number" => $doSerialNumber ? fake()->regexify('[A-Z]{3}-[0-9]{3}-[A-Z]{3}') : null,
            "manufacturer" => $doManufacturer ? fake()->company() : null,
            "is_active" => fake()->boolean(),
            "observations" => $doObservations ? fake()->sentence() : null,
        ];
    }
}
