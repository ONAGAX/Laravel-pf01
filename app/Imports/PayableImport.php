<?php

namespace App\Imports;

use App\Payable;
use Maatwebsite\Excel\Concerns\ToModel;

class PayableImport implements ToModel
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Payable([
            'drink' => $row[19],
            'food' => $row[20],
            'sale_id' => $row[21],
        ]);
    }
}
