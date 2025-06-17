<?php

use App\Models\Incidence;
use App\Models\User;
use Illuminate\Database\QueryException;

test('create incidence', function () {
    $user = User::factory()->create();
    $incidence = Incidence::factory()->make([
        'creator_id' => $user->id,
        'assigned_to_id' => $user->id,
        'origin' => 'internal',
        'notifier' => 'John Doe',
        'description' => 'Test description',
        'priority' => 3,
        'observations' => 'Some observations',
        'is_validated' => false,
        'is_closed' => false,
    ]);

    expect($incidence)->toBeInstanceOf(Incidence::class);
    expect(Incidence::count())->toBe(0);

    $incidence->save();

    expect(Incidence::count())->toBe(1);
    expect($incidence->priority)->toBe(3);
    expect($incidence->description)->toBe('Test description');
});

test('update incidence', function () {
    $incidence = Incidence::factory()->create([
        'description' => 'Original description',
        'priority' => 2,
    ]);

    $incidence->description = 'Updated description';
    $incidence->priority = 5;
    $incidence->save();

    $updated = Incidence::find($incidence->id);
    expect($updated->description)->toBe('Updated description');
    expect($updated->priority)->toBe(5);
});

test('delete incidence', function () {
    $incidence = Incidence::factory()->create();
    expect(Incidence::count())->toBe(1);

    $incidence->delete();
    expect(Incidence::count())->toBe(0);
});

test('cannot create incidence without required fields', function () {
    $this->expectException(QueryException::class);

    // 'description' is required
    Incidence::create([
        // 'description' => null,
        'priority' => 1,
    ]);
});

test('priority must be between 0 and 5', function () {
    $this->expectException(QueryException::class);

    Incidence::create([
        'description' => 'Test',
        'priority' => 10, // Invalid
    ]);
});