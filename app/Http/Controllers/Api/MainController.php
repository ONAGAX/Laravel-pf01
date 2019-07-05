<?php

namespace App\Http\Controllers\Api;

use App\Sale;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MainController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Sale::with(['saleDeposits', 'payables', 'expenses'])->get()->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // ハッシュまるごと入れる方法を探す
        $sale = new Sale();
        // $sale = $request->get('sales'[]);
        $sale->price = $request->price;
        $sale->charge = $request->charge;
        $sale->dinner = $request->dinner;
        $sale->dinnerGroup = $request->dinner_group;
        $sale->dinnerPeople = $request->dinner_people;
        $sale->drink = $request->drink;
        $sale->dt = $request->dt;
        $sale->food = $request->food;
        $sale->goal = $request->goal;
        $sale->lunch = $request->lunch;
        $sale->lunchGroup = $request->lunch_group;
        $sale->lunchPeople = $request->lunch_people;
        $sale->party = $request->party;
        $sale->partyGroup = $request->party_group;
        $sale->partyPeople = $request->party_people;
        $sale->tax = $request->tax;

        $sale->save();

        $sale->expenses()->create($request->get('expenses', []));
        $sale->saleDeposits()->create($request->get('sale_deposits', []));
        $sale->payables()->create($request->get('payables', []));

        return 'success!';
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Sale::with(['saleDeposits', 'payables', 'expenses'])->find($id)->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return Sale::with(['saleDeposits', 'payables', 'expenses'])->find($id)->toJson();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $sale = Sale::find($id);
        $sale->price = $request->price;
        $sale->charge = $request->charge;
        $sale->dinner = $request->dinner;
        $sale->dinnerGroup = $request->dinnerGroup;
        $sale->dinnerPeople = $request->dinnerPeople;
        $sale->drink = $request->drink;
        $sale->dt = $request->dt;
        $sale->food = $request->food;
        $sale->goal = $request->goal;
        $sale->lunch = $request->lunch;
        $sale->lunchGroup = $request->lunchGroup;
        $sale->lunchPeople = $request->lunchPeople;
        $sale->party = $request->party;
        $sale->partyGroup = $request->partyGroup;
        $sale->partyPeople = $request->partyPeople;
        $sale->tax = $request->tax;
        $sale->update();

        $sale->expenses()->update($request->get('expenses', []));
        $sale->saleDeposits()->update($request->get('sale_deposits', []));
        $sale->payables()->update($request->get('payables', []));

        return '更新';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
