<?php

namespace App\Imports;

use App\SaleDeposit;
use Maatwebsite\Excel\Concerns\ToModel;

class SaleDepositImport implements ToModel
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new SaleDeposit([
            'cash' => $row[1],
            'card' => $row[3],
            'receivable' => $row[4],
            'sale_id' => $row[21],
        ]);
    }
}
