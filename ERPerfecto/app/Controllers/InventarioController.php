<?php
    namespace App\Controllers;

use App\Models\InventarioModel;
use App\Controllers\BaseController;

class InventarioController extends BaseController{
    
    public function index(){
        $db = \Config\Database::connect();
        $inventary = new InventarioModel();
        
        //Puedo traerme todos los productos de una vez o usar las funciones "paginate(), pager(), link()"(véase video 44) para paginar el inventario.Por el momento prefiero scroll infinito por tema UX
        $builder = $db->table('inventary');
        $builder->select('*');
        $builder->join('products','products.idProduct = inventary.idProduct');
        $builder->join('category','category.idCategory = products.idCategory');
        $inventary = $builder->get()->getResultArray();
        
        $data = [
            'inventary' => $inventary,
        ];
        $this->loadDefaultView('Inventario',$data,"index"); //Al igual como acá le paso $data y solo va hacia esa parte del view, puedo hacer lo mismo con las otras partes del view
        
    }


    public function addProduct(){

        $this->loadDefaultView('Agregar producto',[],'addProduct');

        
       
    }

    public function show(){
        
    }
    public function eliminar($id){
        echo "eliminando";
    }

    private function loadDefaultView($title,$data,$view){

        $dataHeader = [
            'title' => $title,
        ];

        echo view("templates/header",$dataHeader);
        echo view("templates/sidebar");
        echo view("inventario/$view",$data);
        echo view("templates/footer");
    }

}