<?php

namespace App\Models;
use CodeIgniter\Model;

class InventarioModel extends Model{
    protected $table = 'inventary';
    protected $primaryKey = 'idStock';

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