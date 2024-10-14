<?php

namespace App\Controllers;

class Explainers extends BaseController
{
    public function index(): string
    {
        return view('templates/top') . view('explainers/explainers_home') . view('templates/bottom');
    }

    public function view(string $page) {
        return view('templates/top') . view('explainers/libraries') . view('explainers/'.$page) . view('templates/bottom');
    }
}
