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

    public function searchItem()
    {
        $query = $this->request->getJSON(true)['query'];

        if (is_numeric($query)) {
            $product = $this->searchItemByCode($query);
            $response = $this->response->setJSON(['status' => 'ok', 'data' => $product]);
        } else if (is_string($query)) {
            $items = $this->searchItemByName($query);
            if (count($items) > 0) {
                $response = $this->response->setJSON(['status' => 'ok', 'data' => $items]);
            } else {
                $response = $this->response->setJSON(['status' => 'error', 'message' => 'Nenhum item encontrado, com este nome']);
            }
           
        } else {
            $response = $this->response->setJSON(['status' => 'error']);
        }

        return $response;
    }

    private function searchItemByCode($query)
    {
        $db = Database::connect();

        $productBuilder = $db->table('products');

        $productBuilder->where('barcode', $query);

        $product = $productBuilder->get()->getResultArray();

        return $product[0];
    }

    private function searchItemByName($query)
    {

        $db = Database::connect();

        $productsBuilder = $db->table('products');
        $servicesBuilder = $db->table('services');

        $productsBuilder->like('name', $query);
        $servicesBuilder->like('name', $query);

        $products = $productsBuilder->get()->getResultArray();
        $services = $servicesBuilder->get()->getResultArray();

        $items = array_merge($products, $services);

        return $items;
    }
}
