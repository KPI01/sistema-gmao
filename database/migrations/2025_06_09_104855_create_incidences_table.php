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
        Schema::create('incidences', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('creator_id')->constrained('users')->nullable()->onDelete('set null');
            $table->foreignId('assigned_to_id')->contrained('users')->nullable()->onDelete('set null');
            $table->string('origin')->nullable();
            $table->string('notifier')->nullable();
            $table->text('description');
            $table->integer('priority')->default(0)->max(5)->min(0);
            $table->text('observations')->nullable();
            $table->boolean('is_validated')->default(false);
            $table->timestamp('validated_at')->nullable();
            $table->boolean('is_closed')->default(false);
            $table->timestamp('closed_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidences');
    }
};
