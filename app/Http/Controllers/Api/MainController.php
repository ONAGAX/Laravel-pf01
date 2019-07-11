<?php

namespace App\Http\Controllers\Api;

use App\Sale;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SaleStoreFomrRequest;
use App\Http\Requests\SaleUpdateFormRequest;

class MainController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Sale::with(['saleDeposits', 'payables', 'expenses'])->orderBy('dt', 'asc')->get()->toJson();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SaleStoreFomrRequest $request)
    {
        $sale = new Sale();
        $list = array('price', 'charge', 'dinner', 'dinnerGroup', 'dinnerPeople', 'drink', 'dt', 'food', 'goal', 'lunch', 'lunchGroup', 'lunchPeople', 'party', 'partyGroup', 'partyPeople', 'tax');
        foreach ($list as $ele) {
            $sale->$ele = $request->$ele;
        }
        $sale->save();
        $sale->expenses()->create($request->get('expenses', []));
        $sale->saleDeposits()->create($request->get('sale_deposits', []));
        $sale->payables()->create($request->get('payables', []));

        return response()->json(['status' => 'successful']);
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
    public function update(SaleUpdateFormRequest $request, $id)
    {
        $sale = Sale::find($id);
        $list = array('price', 'charge', 'dinner', 'dinnerGroup', 'dinnerPeople', 'drink', 'dt', 'food', 'goal', 'lunch', 'lunchGroup', 'lunchPeople', 'party', 'partyGroup', 'partyPeople', 'tax');
        foreach ($list as $ele) {
            $sale->$ele = $request->$ele;
        }
        $sale->update();
        $sale->expenses()->update($request->get('expenses', []));
        $sale->saleDeposits()->update($request->get('sale_deposits', []));
        $sale->payables()->update($request->get('payables', []));

        return response()->json(['status' => 'successful']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $sale = Sale::find($id);
        $sale->delete();

        return response()->json(['status' => 'successful']);
    }
}
