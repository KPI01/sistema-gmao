<?php

use App\Models\Asset;
use App\Models\Auxiliar\Asset\Type;
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
        Schema::create("assets", function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("asset_code", 25)->unique()->index();
            $table->string("name", 50);
            $table->string("description", 150)->nullable();
            $table->string("brand", 50)->nullable();
            $table->string("model", 50)->nullable();
            $table->string("serial_number", 75)->nullable()->unique();
            $table->string("manufacturer", 50)->nullable();
            $table->boolean("is_active")->default(true);
            $table->text("observations")->nullable();
            $table->softDeletes();
        });

        Schema::table("incidences", function (Blueprint $table) {
            $table->foreignIdFor(Asset::class)->nullable()->constrained()->onDelete("set null");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');

        Schema::table("incidences", function (Blueprint $table) {
            $table->dropForeign("incidences_asset_id_foreign");
            $table->dropColumn("asset_id");
        });
    }
};
