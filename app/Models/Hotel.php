<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Hotel extends Model
{
    use HasFactory;

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function scopeOrder(Builder $query, $order)
    {
        if ($order->field != null) {
            if ($order->dir != null) {
                $query->orderBy($order->field, $order->dir);
            } else {
                $query->orderBy($order->field);
            }

        }
    }

    public function scopeFilter(Builder $query, $filter)
    {
        if ($filter->hotel_name!=null){
            $query->where("hotel_name", "like", "%$filter->hotel_name%");
        }
        if ($filter->country_id != null) {
            $query->where("country_id", "like", "%$filter->country_id%");
        }
    }


}
