<?php

namespace App\Models;
use CodeIgniter\Model;

class ProductModel extends Model{
    protected $table = 'products';
    protected $primaryKey = 'idProduct';

    public function get($id = null){
        if($id === null){
            return $this->findAll();
        }else{
            return $this->asArray()
                        ->where(['id' => $id])
                        ->firts();
        }
    }
}