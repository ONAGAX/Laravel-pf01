<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payable extends Model
{
    public function sale()
    {
        return $this->belongsTo('App\Sale');
    }
}
