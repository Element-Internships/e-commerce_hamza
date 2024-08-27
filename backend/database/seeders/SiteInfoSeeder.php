<?php



namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SiteInfoSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('site_infos')->insert([
            'about' => 'About content',
            'refund' => 'Refund policy content',
            'parchase_guide' => 'Purchase guide content',
            'privacy' => 'Privacy policy content',
            'address' => 'Address content',
            'android_app_link' => 'https://SaveMart.com/android',
            'ios_app_link' => 'https://SaveMart.com/ios',
            'facbook_link' => 'https://facebook.com/SaveMart',
            'twitter_link' => 'https://twitter.com/SaveMart',
            'instagram_link' => 'https://instagram.com/SaveMart',
            'copyright_text' => '© 2024 SaveMart'
        ]);
    }
}

