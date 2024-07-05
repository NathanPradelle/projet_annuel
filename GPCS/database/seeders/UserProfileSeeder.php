<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class UserProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement("INSERT INTO user_profiles (user, profile) SELECT id, profile_in_use FROM users");
        DB::table('users')->insert([
            'name'=>"admin",
            'email'=>"admin@admin.admin",
            'email_verified_at'=>now(),
            'password'=>"$2y$12$8Wbcno.ZE./d1jIbPVaEq.SNhHpGUSkA6wbHmfDolRv9Gm2EUvAdq",
            'profile_in_use'=>5,
            'remember_token'=>"azerty1234",
        ]);
        DB::table('users')->insert([
            'name'=>"provider",
            'email'=>"provider@provider.provider",
            'email_verified_at'=>now(),
            'password'=>"$2y$12$8Wbcno.ZE./d1jIbPVaEq.SNhHpGUSkA6wbHmfDolRv9Gm2EUvAdq",
            'profile_in_use'=>3,
            'remember_token'=>"qwerty1234",
        ]);
    }
}
