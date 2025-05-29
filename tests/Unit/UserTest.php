<?php

use App\Models\User;

test('create user', function () {
    $user = User::factory()->make();

    expect($user)->toBeInstanceOf(User::class);
    expect(User::all()->count())->toBe(0);

    $user->save();

    expect(User::all()->count())->toBe(1);
});
