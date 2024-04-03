<?php

use App\Models\User;


test('users can authenticate and get back the user object and access token', function () {
    $user = User::factory()->create([
        'email' => fake()->unique()->safeEmail(),
        'password' => 'pass123',
    ]);

    $response = $this->postJson('/api/auth/login', [
        'email' => $user->email,
        'password' => 'pass123',
    ]);


    //assert user authed
    $this->assertAuthenticatedAs($user);
    $response->assertSuccessful();
    $response->assertJsonStructure([
        'status',
        'message',
        'token',
    ]);
});
