<?php

use App\Models\User;
use Illuminate\Database\QueryException;

test('create user', function () {
    $user = User::factory()->make();

    expect($user)->toBeInstanceOf(User::class);
    expect(User::all()->count())->toBe(0);

    $user->save();

    expect(User::all()->count())->toBe(1);
});

test('update user', function () {
    $user = User::factory()->create([
        'name' => 'Original Name',
    ]);

    $user->name = 'Updated Name';
    $user->save();

    $updatedUser = User::find($user->id);
    expect($updatedUser->name)->toBe('Updated Name');
});

test('delete user', function () {
    $user = User::factory()->create();
    expect(User::all()->count())->toBe(1);

    $user->delete();
    expect(User::all()->count())->toBe(0);
});

test('cannot create user without required fields', function () {
    $this->expectException(QueryException::class);

    // Assuming 'email' is required
    User::create([
        // 'email' => null,
        'name' => 'Test User',
        'password' => bcrypt('password'),
    ]);
});
