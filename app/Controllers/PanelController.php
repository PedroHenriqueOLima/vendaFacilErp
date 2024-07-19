<?php

namespace App\Controllers;
use CodeIgniter\HTTP\Request;

class PanelController extends BaseController
{

    public function index() {
        return 'ok';
    }
    public function login()
    {
        return view('login'); 
    }

    public function auth()
    {
        if ($this->request->getMethod() == 'post') {
            $adminPassInput = $this->request->getPost('admin-password');
            $adminPass = getenv('ADMIN_PASSWORD');
            if ($adminPassInput === $adminPass) {
                return $this->response->setJSON(['status' => 'ok']);
            } else {
                return $this->response->setJSON(['status' => 'error']);
            }
        }

    
    }
}
