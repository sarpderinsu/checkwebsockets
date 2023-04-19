<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Post::create([
            'text' => 'yeah',
        ]);

        Post::create([
            'text' => 'asdasd',
        ]);

        Post::create([
            'text' => 'asdads',
        ]);
    }
}
