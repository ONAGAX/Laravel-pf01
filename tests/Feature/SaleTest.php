<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Faker\Generator as Faker;

class SaleTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {

        // $sales = factory(App\User::class)->make(
        //     [
        //         'price' => '500000',
        //         'tax' => '500000',
        //         'goal' => '500000',
        //         'lunch' => '500000',
        //         'dinner' => '500000',
        //         'party' => '500000',
        //         'food' => '500000',
        //         'drink' => '500000',
        //         'charge' => '500000',
        //         'dt' => '20190706',
        //         'lunchGroup' => '2',
        //         'dinnerGroup' => '2',
        //         'partyGroup' => '2',
        //         'lunchPeople' => '2',
        //         'dinnerPeople' => '2',
        //         'partyPeople' => '2',
        //     ]
        // );
        // $this->assertDatabaseHas($sales, $sales->dt);

        $sale = new \App\Sale;
        $sale->price = '500000';
        $sale->tax = '500000';
        $sale->goal = '500000';
        $sale->lunch = '500000';
        $sale->dinner = '500000';
        $sale->party = '500000';
        $sale->food = '500000';
        $sale->drink = '500000';
        $sale->charge = '500000';
        $sale->dt = '20190706';
        $sale->lunchGroup = '2';
        $sale->dinnerGroup = '2';
        $sale->partyGroup = '2';
        $sale->lunchPeople = '2';
        $sale->dinnerPeople = '2';
        $sale->partyPeople = '2';
        $sale->make();
        $readSale = \App\Sale::where('dt', '20190706')->first();
    }
}
