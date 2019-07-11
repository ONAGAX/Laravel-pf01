<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ExpenseImport;

class ExpenseController extends Controller
{
    public function index()
    {
        return view('expense');
    }

    public function store(Request $request)
    {
        $file = $request->file('csv_file');

        Excel::import(new ExpenseImport, $file);

        return redirect('/close');
    }
}
