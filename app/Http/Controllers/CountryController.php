<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Country/Index', [
            "countries"=>Country::with('hotels')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Country/Create");

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'name'=>'required|min:3|max:24',
            'season'=>'required'
        ],
            [
                'name'=>'Šalies pavadinimas yra privalomas ir turi būti ne mažiau kaip 3 ir ne daugiau kaip 24 simboliai',
                'season'=>'Sezono įvedimas yra privalomas'
            ]);


        $country=new Country();
        $country->name=$request->name;
        $country->season=$request->season;
        $country->save();
        return to_route('country.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Country $country)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Country $country)
    {
        return inertia("Country/Edit", [
            "country"=>$country
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Country $country)
    {
        $country->name=$request->name;
        $country->season=$request->season;
        $country->save();
        return to_route("country.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Country $country)
    {
        $country->delete();
        return to_route("country.index");
    }
}
