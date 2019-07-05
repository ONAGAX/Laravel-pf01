<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SaleDeposit extends Model
{

    protected $fillable = [
        'cash',
        'card',
        'receivable'
    ];

    public function sale()
    {
        return $this->belongsTo('App\Sale');
    }
}
