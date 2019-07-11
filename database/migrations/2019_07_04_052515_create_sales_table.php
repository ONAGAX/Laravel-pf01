<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('price');
            $table->integer('tax');
            $table->integer('goal');
            $table->integer('lunch');
            $table->integer('lunchGroup');
            $table->integer('lunchPeople');
            $table->integer('dinner');
            $table->integer('dinnerGroup');
            $table->integer('dinnerPeople');
            $table->integer('party');
            $table->integer('partyGroup');
            $table->integer('partyPeople');
            $table->integer('food');
            $table->integer('drink');
            $table->integer('charge');
            $table->date('dt')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales');
    }
}
