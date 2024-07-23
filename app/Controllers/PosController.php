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

            if (!isNull(count($product))) {
                return json_encode(['status' => 'ok', 'data' => $product]);
            } else {
                return json_encode(['status' => 'error']);
            }
        } else {
            $items = $this->searchItemByName($query);
            return json_encode(['status' => 'ok', 'data' => $items]);
        }
    }

    private function searchItemByCode($query)
    {
        $db = Database::connect();

        $productBuilder = $db->table('products');

        $productBuilder->where('barcode', $query);

        $product = $productBuilder->get()->getResult();


        return $product;
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