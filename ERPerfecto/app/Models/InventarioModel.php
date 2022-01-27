<?php

namespace App\Models;
namespace Config;

use CodeIgniter\Model;

class InventarioModel extends Model{
    protected $table = 'inventary';
    protected $primaryKey = 'idStock';
    protected $allowedFields = ['SKUProduct','productName','idCategory','productDescription','productPrice'];
    $db = \Config\Database::connect();

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
        if (! empty($data)) {
                $sqlInsert = $this->dbSecondary->prepare("INSERT INTO products(SKUProduct, productName, idCategory, productDescription, productPrice) VALUES(:SKUProduct, :productName, :idCategory, :productDescription, :productPrice)");
                foreach($data as $dat => $val){
                    echo "<pre>";
                    var_dump($dat);
                    echo "<br>";
                    var_dump($val);
                    echo "</pre>";
                    exit;
                }
                

            }
        }
}