<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuestionController extends Controller
{
    //direct question list page
    public function list()
    {
        return view('admin.question.list');
    }
}
