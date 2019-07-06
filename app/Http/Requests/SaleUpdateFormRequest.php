<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaleUpdateFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'price' => 'required|max:255',
            'tax' => 'required|max:255',
            'goal' => 'required|max:255',
            'lunch' => 'required|max:255',
            'dinner' => 'required|max:255',
            'party' => 'required|max:255',
            'food' => 'required|max:255',
            'drink' => 'required|max:255',
            'charge' => 'required|max:255',
            'dt' => 'required|max:255',
            'sale_deposits.cash' => 'required|max:255',
            'sale_deposits.card' => 'required|max:255',
            'sale_deposits.receivable' => 'required|max:255',
            'payables.food' => 'required|max:255',
            'payables.drink' => 'required|max:255',
            'expenses.personal' => 'required|max:255',
        ];
    }
}
