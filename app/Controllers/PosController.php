<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use Config\Database;
use PHPUnit\Framework\Constraint\ObjectEquals;
use PHPUnit\Framework\MockObject\Stub\ReturnReference;

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
        $query = $this->request->getVar('query');

        if (is_numeric($query) && (strlen($query) === 12 || strlen($query) === 13)) {
            $product = $this->searchItemByCode($query);
            if ($product) {
                $response = $this->response->setJSON(['status' => 'ok', 'message' => 'Item encontrado', 'data' => $product]);
                return $response;
            } else {
                $response = $this->response->setJSON(['status' => 'error', 'message' => 'Item não encontrado', 'data' => null]);
                return $response;
            }
        } else {
            if (is_string($query) && strlen($query) > 0) {
                $items = $this->searchItemByName($query);
                if ($items) {
                    $response = $this->response->setJSON(['status' => 'ok', 'message' => 'Registros encontrados', 'data' => $items]);
                } else {
                    $response = $this->response->setJSON(['status' => 'error', 'message' => 'Nenhum registro encontrado', 'data' => null]);
                }
                return $response;
            }
        }
    }

    private function searchItemByCode($query)
    {

        $productBuilder = $this->db->table('products');

        $product = $productBuilder->getWhere(['barcode' => $query])->getRow();

        return $product;
    }


    private function searchItemByName($query)
    {

        $productBuilder = $this->db->table('products');
        $servicesBuilder = $this->db->table('services');


        $products = $productBuilder->getWhere(['name' => $query])->getResultArray();
        $services = $servicesBuilder->getWhere(['name' => $query])->getResultArray();

        if (count($products) > 0 && count($services) > 0) {

            $items = array_merge($products, $services);
            return $items;
        } else if (count($products) === 0 || count($services) === 0) {

            if (count($products) > 0) {

                $items = $products;
                return $items;
            } else if (count($services) > 0) {

                $items = $services;
                return $items;
            }
        } else {

            return null;
        }
    }
}
