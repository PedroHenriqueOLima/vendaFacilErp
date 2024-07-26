<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use Config\Database;
use PHPUnit\Framework\Constraint\ObjectEquals;

use function PHPUnit\Framework\isNull;



class PosController extends BaseController
{

    private $db;

    public function __construct()
    {
        $this->db = Database::connect();
    }
    public function index()
    {
        return view('pos');
    }

    public function searchItem()
    {

        $request = $this->request->getGetPost('query');

        if (!isNull($request)) {

            if (is_numeric($request)) {

                $product = $this->searchProduct($request, null);

                $item = $product[0];

                $response = $this->response->setJSON(['status' => 'ok', 'data' => $item]);

                return $response;
            } else {

                $products = $this->searchProduct(null, $request);

                $services = $this->searchService($request);

                if (!isNull($products && $services)) {
                    $items = array_merge($products, $services);
                } elseif (!isNull($products)) {
                    $items = $products;
                } elseif (!isNull($services)) {
                    $items = $services;
                }

                if (count($items) > 0) {
                    $response = $this->response->setJSON(['status' => 'ok', 'data' => $items]);
                } else {
                    $response = $this->response->setJSON(['status' => 'error']);
                }

                return $response;
            }
        } else {

            $response = $this->response->setJSON(['status' => 'error']);
            
            return $response;

        }
    }

    private function searchProduct($barcode, $name)
    {

        // Selecionando tabela de produtos

        $productsBuilder = $this->db->table('products');

        // Buscando pelo código

        if (!isNull($barcode)) {
            $product = $productsBuilder->where(['code' => $barcode])->get()->getResultArray();
            return $product;
        }


        // Buscando pelo nome


        if (!isNull($name)) {
            $products = $productsBuilder->like(['name' => $name])->get()->getResultArray();
            return $products;
        }
    }

    private function searchService($name)
    {

        $servicesBuilder = $this->db->table('services');

        $services = $servicesBuilder->like(['name' => $name])->get()->getResultArray();

        return $services;
    }
}
