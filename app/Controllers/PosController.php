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
        $query = $this->request->getVar('query');

        if (is_numeric($query) && (strlen($query) === 12 || strlen($query) === 13)) {
            $product = $this->searchItemByCode($query);
            if ($product) {
                $response = $this->response->setJSON(['status' => 'ok','message' => 'Item encontrado', 'data' => $product]);
                return $response;
            } else {
                $response = $this->response->setJSON(['status' => 'error','message' => 'Item não encontrado', 'data' => null]);
                return $response;
            }
        }
    }

    private function searchItemByCode($query){

        $productBuilder = $this->db->table('products');

        $product = $productBuilder->getWhere(['barcode' => $query])->getRow();

        return $product;
    }
}
