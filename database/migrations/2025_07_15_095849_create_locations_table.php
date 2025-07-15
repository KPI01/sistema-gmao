<?php

use App\Models\Location;
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
        Schema::create("locations", function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name", 75);
            $table->string("description", 255)->nullable();
            $table->string("code", 25)->unique()->index();
            $table->string("location_type", 50)->index();
            $table->boolean("is_active")->default(true);
            $table->foreignIdFor(Location::class, "parent_id")->nullable()->constrained("locations")->nullOnDelete();
        });

        Schema::table("assets", function (Blueprint $table) {
            $table->foreignIdFor(Location::class, "location_id")->nullable()->constrained("locations")->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("locations");
        Schema::table("assets", function (Blueprint $table) {
            $table->dropForeign(["location_id"]);
            $table->dropColumn("location_id");
        });
    }
};
