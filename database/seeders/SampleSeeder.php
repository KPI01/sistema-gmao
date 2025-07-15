<?php

namespace Database\Seeders;

use App\Models\Asset;
use App\Models\Incidence;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SampleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        User::factory()->count(10)->create();

        Incidence::factory()->count(10)->create();

        Asset::factory()->count(10)->create();
    }
}
