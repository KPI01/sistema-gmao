<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIncidenceRequest;
use App\Http\Requests\UpdateIncidenceRequest;
use App\Models\Incidence;

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
        return inertia('Resources/Incidence/Show', [
            'incidence' => $incidence->load(['creator', 'assignedTo'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Incidence $incidence)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateIncidenceRequest $request, Incidence $incidence)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Incidence $incidence)
    {
        //
    }
}
