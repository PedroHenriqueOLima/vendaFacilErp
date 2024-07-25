<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use Config\Database;

use function PHPUnit\Framework\isNull;

class PosController extends BaseController
{
    public function index()
    {
        return view('pos');
    }

}
