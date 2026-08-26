<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('collections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('color', 20)->default('cyan');
            $table->timestamps();

            $table->index(['user_id', 'name']);
        });

        Schema::create('collection_snippet', function (Blueprint $table) {
            $table->foreignId('collection_id')->constrained()->cascadeOnDelete();
            $table->foreignId('snippet_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->primary(['collection_id', 'snippet_id']);
            $table->index(['snippet_id', 'collection_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('collection_snippet');
        Schema::dropIfExists('collections');
    }
};
