<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class UserProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'firstname' => "admin",
            'lastname' => "ADM",
            'email' => "admin@admin.admin",
            'email_verified_at' => now(),
            'password' => "$2y$12$8Wbcno.ZE./d1jIbPVaEq.SNhHpGUSkA6wbHmfDolRv9Gm2EUvAdq",
            'profile_in_use' => 5,
            'remember_token' => "azerty1234",
        ]);
        DB::table('users')->insert([
            'firstname' => "provider",
            'lastname' => "PVD",
            'email' => "provider@provider.provider",
            'email_verified_at' => now(),
            'password' => "$2y$12$8Wbcno.ZE./d1jIbPVaEq.SNhHpGUSkA6wbHmfDolRv9Gm2EUvAdq",
            'profile_in_use' => 3,
            'remember_token' => "qwerty1234",
        ]);

        DB::statement("INSERT INTO 'user_profiles' (user, profile) SELECT id, profile_in_use FROM 'users'");
    }
}
