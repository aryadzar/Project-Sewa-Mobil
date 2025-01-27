<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */


        public function run(): void
        {
// Angka 4 digit acak
            Role::insert([

            [   'id' => User::$UUID_ADMIN,
                'nama_role' => 'admin'
            ],
            [
                "id" =>  User::$UUID_CUST,
                'nama_role' => 'customer'
            ]
            ]);
        }
}
