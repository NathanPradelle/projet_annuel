<?php

namespace Database\Seeders;

use App\Models\User;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ApartementsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('apartments')->insert([
            'name' => "appartement fleuri",
            'postal_code' => 92130,
            'street' => "10 rue des fleurs",
            'surface' => 30,
            'guestCount' => 4,
            'roomCount' => 3,
            'price' => 80,
            'user_id' => 1
        ]);

        DB::table('apartments')->insert([
            'name' => "yeux des mers",
            'postal_code' => 13008,
            'street' => "4 Bd Piot",
            'surface' => 40,
            'guestCount' => 5,
            'roomCount' => 3,
            'price' => 100,
            'user_id' => 1
        ]);
    }
}
