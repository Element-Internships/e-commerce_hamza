<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddProductCodeToProductReviewsTable extends Migration
{
    public function up()
    {
        Schema::table('product_reviews', function (Blueprint $table) {
            $table->string('product_code')->after('product_name'); // Add the product_code column
        });
    }

    public function down()
    {
        Schema::table('product_reviews', function (Blueprint $table) {
            $table->dropColumn('product_code');
        });
    }
}
