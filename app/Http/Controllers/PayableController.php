<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\PayableImport;

class PayableController extends Controller
{
    public function index()
    {
        return view('payable');
    }

    public function store(Request $request)
    {
        $file = $request->file('csv_file');

        Excel::import(new PayableImport, $file);

        return redirect('/expense');
    }
}
