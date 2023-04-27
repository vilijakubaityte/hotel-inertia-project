<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Event;
use App\Models\Hotel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {


        $emFilter= new \stdClass();
        $emFilter->hotel_name="";
        $emFilter->country_id="";

        $emOrder=new \stdClass();
        $emOrder->field=null;
        $emOrder->dir=null;

        $filter=$request->session()->get("hotel_filter", $emFilter);
        $order=$request->session()->get("hotel_order", $emOrder);


        return inertia('Hotel/Index',[
//            'can' => [
//                ' create_user' =>Gate::allows('editHotels'),
//            ],
            "hotels"=>Hotel::filter($filter)->order($order)->with(['country', 'users'])->get(),
            "country"=>Country::all(),
            "filter"=>$filter,
            "order"=>$order

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Hotel/Create", [
            "country"=>Country::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'hotel_name'=>'required',
            'price'=>'required|numeric',
            'duration'=>'required',
            'country_id'=>'required'
        ],
            [
                'hotel_name'=>'Viešbučio pavadinimas yra privalomas',
                'price'=>'Kaina yra privaloma ir turi būti įvesta skaičiais',
                'duration'=>'Trukmės įvedimas yra privalomas',
                'country_id'=>'Šalis yra privaloma'
            ]);




        $hotel=new Hotel();
        $hotel->hotel_name=$request->hotel_name;
        $hotel->price=$request->price;
//        $hotel->picture=$request->picture;
        $hotel->duration=$request->duration;
        $hotel->country_id=$request->country_id;
        if ($request->file('picture')!=null){
            $request->file('picture')->store('/public/hotel');
            $hotel->picture=$request->file('picture')->hashName();
        }
        $hotel->save();
        return to_route('hotel.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Hotel $hotel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hotel $hotel)
    {
        return inertia("Hotel/Edit", [
            "hotel"=>$hotel,
            "country"=>Country::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hotel $hotel)
    {

        $hotel->hotel_name=$request->hotel_name;
        $hotel->price=$request->price;
        $hotel->duration=$request->duration;
        $hotel->country_id=$request->country_id;
        if ($request->file("picture")!=null){
            if ($hotel->picture!=null){
                unlink(storage_path()."/app/public/hotel/".$hotel->picture);
            }
            $request->file("picture")->store("/public/hotel");
            $hotel->picture=$request->file("picture")->hashName();
        }
        $hotel->save();
        return to_route('hotel.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hotel $hotel)
    {
        $hotel->delete();
        return to_route("hotel.index");
    }

    public function order($field, $dir, Request $request)
    {
        $order = new \stdClass();
        $order->field = $field;
        $order->dir = $dir;
        $request->session()->put("hotel_order", $order);
        return to_route("hotel.index");
    }


    public function filter (Request $request){
        $filter = new \stdClass();
        $filter->hotel_name=$request->hotel_name;
        $filter->country_id=$request->country_id;

        $request->session()->put("hotel_filter", $filter);
        return to_route("hotel.index");
    }

    public function attend($hotel, $id){

        $hotels=Hotel::find($hotel);
        $user=User::find($id);

        if($user->hotels->contains($hotels->id)){
            $user->hotels()->detach($hotels->id);
            return to_route('hotel.index');
        }

        $user->hotels()->attach($hotels->id);
        $user->save();

        return to_route('hotel.index');

    }

}
