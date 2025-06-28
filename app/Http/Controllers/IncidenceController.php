<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIncidenceRequest;
use App\Http\Requests\UpdateIncidenceCloseRequest;
use App\Http\Requests\UpdateIncidenceRequest;
use App\Http\Requests\UpdateIncidenceValidationRequest;
use App\Models\Incidence;
use App\Models\User;

class IncidenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data = Incidence::all();

        return inertia('Resources/Incidence/Index', compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreIncidenceRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Incidence $incidence)
    {
        //
        return inertia("Resources/Incidence/Show", [
            "incidence" => $incidence->load(["creator", "assignedTo"])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Incidence $incidence)
    {
        //
        return inertia("Resources/Incidence/Edit", [
            "incidence" => $incidence->makeVisible(["creator_id", "assigned_to_id"])->load(["creator", "assignedTo"]),
            "aux" => [
                "users" => User::where("id", "!=", $incidence->assigned_to_id)
                    ->get(["id", "name"])
                    ->pluck("name", "id")
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateIncidenceRequest $request, Incidence $incidence)
    {
        //
        logger("preparing incidence for update...");
        $validated = $request->validated();
        logger("validated data:", [$validated]);

        $incidence->update($validated);
        $incidence->refresh();

        return redirect()->route('incidence.show', $incidence)->with('success', 'La incidencia ha sido actualizada correctamente.');
    }

    public function validateIncidence(UpdateIncidenceValidationRequest $request, Incidence $incidence)
    {
        logger("incidence to validate:", [$incidence->id]);

        $validated = $request->validated();
        logger("validated data:", [$validated]);

        $incidence->update([...$validated, "validated_at" => now()]);

        return redirect()->route('incidence.show', $incidence)->with('success', 'La incidencia ha sido validada correctamente.');
    }
    public function closeIncidence(UpdateIncidenceCloseRequest $request, Incidence $incidence)
    {
        logger("incidence to close:", [$incidence->id]);

        $validated = $request->validated();
        logger("validated data:", [$validated]);

        $incidence->update([...$validated, "closed_at" => now()]);

        return redirect()->route('incidence.show', $incidence)->with('success', 'La incidencia ha sido cerrada correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Incidence $incidence)
    {
        //
        $incidence->delete();
        return redirect()->route('incidence.index')->with('success', 'La incidencia ha sido eliminada correctamente.');
    }
}
