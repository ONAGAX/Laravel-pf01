<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
        'charge',
        'dinner',
        'dinnerGroup',
        'dinnerPeople',
        'drink',
        'dt',
        'food',
        'goal',
        'lunch',
        'lunchGroup',
        'lunchPeople',
        'party',
        'partyGroup',
        'partyPeople',
        'price',
        'tax'
    ];

    public function saleDeposits()
    {
        return $this->hasOne('App\SaleDeposit');
    }

    public function payables()
    {
        return $this->hasOne('App\Payable');
    }

    public function expenses()
    {
        return $this->hasOne('App\Expense');
    }
}
