<?php

namespace App\Controllers;
use CodeIgniter\HTTP\Request;
use Config\Database;

class PosController extends BaseController
{
    public function index()
    {
        return view('pos');
    }

    public function searchItem()
    {
        $query = $this->request->getJSON(true)['query'];
        
        $db = Database::connect();

        $builderProducts = $db->table('products');

        $builderServices = $db->table('services');

        $builderProducts->like('name', $query)->orLike('barcode', $query);
        $builderServices->like('name', $query);

        $products = $builderProducts->get()->getResult();
        $services = $builderServices->get()->getResult();

        $combinedResults = array_merge($products, $services);

        if (count($combinedResults) > 0) {
            return $this->response->setJSON(['status' => 'ok', 'data' => $combinedResults]);
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Produto ou Serviço não encontrado!']); 
        }

    }
}
