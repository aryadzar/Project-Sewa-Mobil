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
        Schema::create('user_roles', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->uuid('id_role');
            $table->uuid('id_user');
            $table->uuid('id_actor');

            $table->foreign('id_user')->references('id')->on('users');
            $table->foreign('id_role')->references('id')->on('role');
            $table->foreign('id_actor')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_role');
    }
};
