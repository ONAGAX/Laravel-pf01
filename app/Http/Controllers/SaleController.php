<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\SalesImport;

class SaleController extends Controller
{
    public function index()
    {
        return view('sales');
    }

    public function store(Request $request)
    {
        $file = $request->file('csv_file');

        Excel::import(new SalesImport, $file);
    }
}
