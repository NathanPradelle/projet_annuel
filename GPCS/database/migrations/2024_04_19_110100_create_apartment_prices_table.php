<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('apartment_prices', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('apartments_id')->references('id')->on('apartments');
            $table->string('rule')->default('default');//semaine/week-end/ete/hiver/etc
            $table->timestamp('update_date');
            $table->float('prix',10)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apartment_prices');
    }
};
