<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index(): string
    {
        return view('templates/top') . view('home') . view('templates/bottom');
    }
}
