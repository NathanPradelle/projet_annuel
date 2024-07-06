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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->timestamp('created_at')->useCurrent();
        });

        DB::table('profiles')->insert(
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
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
