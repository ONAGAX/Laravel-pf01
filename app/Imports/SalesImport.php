<?php

namespace App\Imports;

use App\Sale;
use Maatwebsite\Excel\Concerns\ToModel;

class SalesImport implements ToModel
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Sale([
            'dt' => $row[0],
            'price' => $row[1],
            'tax' => $row[2],
            'lunch' => $row[5],
            'party' => $row[6],
            'dinner' => $row[7],
            'food' => $row[8],
            'drink' => $row[9],
            'charge' => $row[10],
            'goal' => $row[12],
            'lunchGroup' => $row[13],
            'lunchPeople' => $row[14],
            'partyGroup' => $row[15],
            'partyPeople' => $row[16],
            'dinnerGroup' => $row[17],
            'dinnerPeople' => $row[18],
        ]);
    }
}
