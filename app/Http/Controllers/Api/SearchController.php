<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Sale;

class SearchController extends Controller
{
    // 2019年のみの検索に対応している、elseのarray[0]がYYYYなのでwhereYear追加する
    public function index(Request $request)
    {
        $keyword = $request->input('dt');
        if (empty($keyword)) {
            return Sale::with(['saleDeposits', 'payables', 'expenses'])->orderBy('dt', 'asc')->get()->toJson();
        } else {
            $array = explode("-", $keyword);
            return Sale::whereMonth('dt', "=", $array[1])->with(['saleDeposits', 'payables', 'expenses'])->orderBy('dt', 'asc')->get();
        }
    }
}
