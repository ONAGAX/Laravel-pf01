<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $fillable = [
        'personal',
        'sale_id'
    ];

    public function sale()
    {
        return $this->belongsTo('App\Sale');
    }
}
