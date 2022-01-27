<?php

namespace App\Models;
use CodeIgniter\Model;


class InventarioModel extends Model{
    protected $table = 'inventary';
    protected $primaryKey = 'idStock';
    protected $allowedFields = ['SKUProduct','productName','idCategory','productDescription','productPrice'];

    public function get($id = null){
        if($id === null){
            return $this->findAll();
        }else{
            return $this->asArray()
                        ->where(['idProducto' => $id])
                        ->firts();
        }
    }
    public function crossInsert($data = NULL){
        $db = \Config\Database::connect();
        if (!empty($data)) {
                
            $builderCross = $db->table('products');
            $resultCross = $builderCross->insert($data);
            if($resultCross){
                $datSKUProd = $data['SKUProduct'];
                $dataInv = [
                    'SKUProduct' => $datSKUProd,
                    'productStock' => '',
                ];
                $result = $this->insert($dataInv);
            }
            
            return $resultCross;
        }else{
            return false;
        }
    }
}