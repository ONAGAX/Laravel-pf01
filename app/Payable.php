<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payable extends Model
{
    protected $fillable = [
        'food',
        'drink'
    ];

    public function sale()
    {
        return $this->belongsTo('App\Sale');
    }
}
