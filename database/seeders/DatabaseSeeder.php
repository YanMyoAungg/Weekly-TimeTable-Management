<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        DB::table('timeslots')->insert([
            ['start_time' => '08:00:00', 'end_time' => '09:00:00'],
            ['start_time' => '09:00:00', 'end_time' => '10:00:00'],
            ['start_time' => '10:00:00', 'end_time' => '11:00:00'],
            ['start_time' => '11:00:00', 'end_time' => '12:00:00'],
            ['start_time' => '12:00:00', 'end_time' => '13:00:00'],
            ['start_time' => '13:00:00', 'end_time' => '14:00:00'],
            ['start_time' => '14:00:00', 'end_time' => '15:00:00'],
            ['start_time' => '15:00:00', 'end_time' => '16:00:00'],
            ['start_time' => '16:00:00', 'end_time' => '17:00:00'],
        ]);

        DB::table('teachers')->insert([
            ['name' => 'Aye Aye', 'email' => 'ayeaye@example.com'],
            ['name' => 'Mg Mg', 'email' => 'mgmg@example.com'],
            ['name' => 'Tun Tun', 'email' => 'tuntun@example.com'],
        ]);

        DB::table('subjects')->insert([
            ['name' => 'Mathematics'],
            ['name' => 'Science'],
            ['name' => 'History'],
            ['name' => 'Geography'],
            ['name' => 'English'],
            ['name' => 'Chemistry'],
            ['name' => 'Biology'],
            ['name' => 'Physics'],
        ]);
    }
}
