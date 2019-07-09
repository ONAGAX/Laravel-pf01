<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class SaleStoreFomrRequest extends FormRequest
{
    public function rules()
    {
        return [
            'price' => 'required|max:50',
            'tax' => 'required|max:50',
            'goal' => 'required|max:50',
            'lunch' => 'required|max:50',
            'dinner' => 'required|max:50',
            'party' => 'required|max:50',
            'food' => 'required|max:50',
            'drink' => 'required|max:50',
            'charge' => 'required|max:50',
            'dt' => 'required|max:50',
            'sale_deposits.cash' => 'required|max:50',
            'sale_deposits.card' => 'required|max:50',
            'sale_deposits.receivable' => 'required|max:50',
            'payables.food' => 'required|max:50',
            'payables.drink' => 'required|max:50',
            'expenses.personal' => 'required|max:50',
        ];
    }
    public function messages()
    {
        return [
            'price.required' => '必須',
            'tax.required' => '必須',
            'goal.required' => '必須',
            'lunch.required' => '必須',
            'dinner.required' => '必須',
            'party.required' => '必須',
            'food.required' => '必須',
            'drink.required' => '必須',
            'charge.required' => '必須',
            'dt.required' => '必須',
            'sale_deposits.cash.required' => '必須',
            'sale_deposits.card.required' => '必須',
            'sale_deposits.receivable.required' => '必須',
            'apyables.food.required' => '必須',
            'payables.drink.required' => '必須',
            'expenses.required' => '必須',
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        $response['data']    = [];
        $response['status']  = 'NG';
        $response['summary'] = 'Failed validation.';
        $response['errors']  = $validator->errors()->toArray();

        throw new HttpResponseException(
            response()->json($response, 422)
        );
    }
}
