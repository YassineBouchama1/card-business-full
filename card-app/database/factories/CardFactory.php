<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


class CardFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name,
            'company' => fake()->company,
            'title' => fake()->title,
            'contact' => fake()->phoneNumber,
        ];
    }
}
