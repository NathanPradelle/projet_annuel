<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profile', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->timestamp('created_at')->useCurrent();
        });

        DB::table('profile')->insert(
            array(
                [
                    'id' => 1,
                    'name' => 'Lessor',
                    'description' => 'People who rent their apartment',
                ],
                [
                    'id' => 2,
                    'name' => 'Traveler',
                    'description' => 'People searching for an apartment',
                ],
                [
                    'id' => 3,
                    'name' => 'Provider',
                    'description' => 'People who provide services, such as taxi or cleaning',
                ],
                [
                    'id' => 4,
                    'name' => 'Management',
                    'description' => 'Manage',
                ],
                [
                    'id' => 5,
                    'name' => 'Admin',
                    'description' => 'Admin',
                ],
            )
        );

        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user')->references('id')->on('users');
            $table->foreignId('profile')->references('id')->on('profile');
        });

        DB::statement("INSERT INTO user_profiles (user, profile) SELECT id, role FROM users");

        DB::statement("ALTER TABLE users DROP COLUMN role");

        Schema::dropIfExists('role');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('role', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->integer('role')->nullable();
        });

        DB::statement("UPDATE users SET role = (
            SELECT profile FROM user_profiles 
            WHERE user_profiles.user = users.id 
            LIMIT 1
        )");

        Schema::table('users', function (Blueprint $table) {
            $table->integer('role')->nullable(false)->change();
        });

        Schema::dropIfExists('user_profiles');
        Schema::dropIfExists('profile');
}
};