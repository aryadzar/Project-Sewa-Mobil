<?php

namespace Database\Seeders;

use App\Models\SetRole;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class set_role_seeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SetRole::create([
            'id_role'=> User::$UUID_ADMIN,
            'id_user'=> '6804ace2-2b06-4945-b5f3-5078400eae24',
            'id_actor'=> '6804ace2-2b06-4945-b5f3-5078400eae24'
        ]);
    }
}
