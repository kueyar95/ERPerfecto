<?php
    namespace App\Controllers;

class PersonalController extends BaseController{
    
    public function index(){


        echo view("personal/index");
    }
}