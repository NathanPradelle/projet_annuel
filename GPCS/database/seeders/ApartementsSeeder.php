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

        DB::table('apartments')->insert([
            'name' => "Cabanon",
            'postal_code' => 18000,
            'street' => "120 Rue Louis Mallet",
            'surface' => 25,
            'guestCount' => 2,
            'roomCount' => 2,
            'price' => 60,
            'user_id' => 1
        ]);

        DB::table('apartments')->insert([
            'name' => "Air de montagne",
            'postal_code' => 05100,
            'street' => "1 Chem. de la Jalasse",
            'surface' => 30,
            'guestCount' => 3,
            'roomCount' => 3,
            'price' => 88,
            'user_id' => 2
        ]);

        DB::table('apartments')->insert([
            'name' => "Ville Cryante",
            'postal_code' => 69001,
            'street' => "25 Rue de l'Annonciade",
            'surface' => 40,
            'guestCount' => 5,
            'roomCount' => 4,
            'price' => 116,
            'user_id' => 2
        ]);

        DB::table('apartments')->insert([
            'name' => "Maison des pluies",
            'postal_code' => 22370,
            'street' => "23 Rue des Soujoux",
            'surface' => 40,
            'guestCount' => 4,
            'roomCount' => 3,
            'price' => 80,
            'user_id' => 3
        ]);

        DB::table('apartments')->insert([
            'name' => "Au champions Beyblade",
            'postal_code' => 16000,
            'street' => "1 Rue Gontran Labregere",
            'surface' => 50,
            'guestCount' => 8,
            'roomCount' => 4,
            'price' => 150,
            'user_id' => 4
        ]);
    }
}
