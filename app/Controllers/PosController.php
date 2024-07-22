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
        
        if (is_numeric($query)) {
            $products = $this->searchItemByCode($query);
        } else {
            $products = $this->searchItemByName($query);
        }

    }

    private function searchItemByCode($query) {
        $db = Database::connect();

        $productsBuilder = $db->table('products');

        $productsBuilder->where('barcode', $query);

        $products = $productsBuilder->get();

        return $products;
    }

    private function searchItemByName($query) {

        $db = Database::connect();

        $productsBuilder = $db->table('products');
        $servicesBuilder = $db->table('services');

        $productsBuilder->like('name', $query);
        $servicesBuilder->like('name', $query);

        $products = $productsBuilder->get();
        $services = $servicesBuilder->get();

        $results = array_merge($products, $services);

        return $results;


    }
}
