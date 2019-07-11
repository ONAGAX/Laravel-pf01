<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SaleDeposit extends Model
{

    protected $fillable = [
        'cash',
        'card',
        'receivable',
        'sale_id'
    ];

    public function sale()
    {
        return $this->belongsTo('App\Sale');
    }
}
