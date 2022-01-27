<?php
    namespace App\Controllers;

use App\Models\InventarioModel;
use App\Controllers\BaseController;

class InventarioController extends BaseController{
    
    public function index(){
        $db = \Config\Database::connect();
        $validation = \Config\Services::validation();
        $inventary = new InventarioModel();

        //Puedo traerme todos los productos de una vez o usar las funciones "paginate(), pager(), link()"(véase video 44) para paginar el inventario.Por el momento prefiero scroll infinito por tema UX
        $builder = $db->table('inventary');
        $builder->select('*');
        $builder->join('products','products.SKUProduct = inventary.SKUProduct');
        $builder->join('category','category.idCategory = products.idCategory');
        $inventary = $builder->get()->getResultArray();
        
        $data = [
            'inventary' => $inventary,
        ];
        $this->loadDefaultView('Inventario',$data,"index"); //Al igual como acá le paso $data y solo va hacia esa parte del view, puedo hacer lo mismo con las otras partes del view
        
    }


    public function addProduct(){
        
        $invModel = new InventarioModel();
        $dataFormProduct = $this->request->getJSON();
        $dataFormProduct = (array) $dataFormProduct;
        if($this->validate([
            'productName'           => 'required|max_length[100]|alpha_numeric',
            'SKUProduct'            => 'required|max_length[30]|alpha_numeric',
            'idCategory'            => 'required|numeric',
            'productDescription'    => 'alpha_numeric_punct|permit_empty',
            'productPrice'           => 'required',
        ])){
            
            $insertProduct = $invModel->crossInsert([
                'SKUProduct'            =>$dataFormProduct['SKUProduct'],
                'productName'           =>$dataFormProduct['productName'],
                'idCategory'            =>$dataFormProduct['idCategory'],
                'productDescription'    =>$dataFormProduct['productDescription'],
                'productPrice'           =>$dataFormProduct['productPrice'],
            ]);
            $jsonInsert = json_encode($insertProduct);
            echo $jsonInsert;
        }else{
            $validation = \Config\Services::validation();
            $dataValidation = $validation->getErrors();
            $jsonValidation = json_encode($dataValidation);
            echo $jsonValidation;
        }
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