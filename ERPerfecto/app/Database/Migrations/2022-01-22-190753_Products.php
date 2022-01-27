<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Products extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'idProduct' => [
                'type'           => 'INT',
                'auto_increment' => true,
            ],
            'CodBaProduct'          => [
                'type'           => 'VARCHAR',
                'constraint'     => 30,
                'null'           => true,
            ],
            'SKUProduct'=>[
                'type' => 'VARCHAR',
                'constraint' => 30,
                'null'           => true,
            ],
            'productName'       => [
                'type'       => 'VARCHAR',
                'constraint' => 100
            ],
            'productDescription' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'productPrice' => [
                'type' => 'INT'
            ]
        ]);
        $this->forge->addKey('idProduct', true);
        $this->forge->createTable('products');
    }

    public function down()
    {
        $this->forge->dropTable('products');
    }
}
