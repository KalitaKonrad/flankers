<?php

namespace Database\Factories;

use App\Models\Game;
use Illuminate\Database\Eloquent\Factories\Factory;

class GameFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Game::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'type' => 'public',
            'rated' => false,
            'public' => true,
            'completed' => false,
            'bet' => $this->faker->numberBetween(1, 10),
            'duration' => $this->faker->numberBetween(60 * 10, 60 * 15),
            'long' => $this->faker->longitude(),
            'lat' => $this->faker->latitude()
        ];
    }
}
