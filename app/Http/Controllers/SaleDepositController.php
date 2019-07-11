<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\SaleDepositImport;

class SaleDepositController extends Controller
{
    public function index()
    {
        return view('saledeposit');
    }

    public function store(Request $request)
    {
        $file = $request->file('csv_file');

        Excel::import(new SaleDepositImport, $file);

        return redirect('/payable');
    }
}
