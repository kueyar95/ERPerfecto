<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Inventario extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'idStock' => [
                'type' => 'INT',
                'auto_increment' => true,
            ],
            'idProduct' => [
                'type' => 'INT',
                'constraint' => 9,
                'unsigned' => true,
                'null' => false,
            ]
            ,
            'productStock' => [
                'type' => 'INT',
                'constraint' => 9,
                'unsigned' => true,
            ],
        ]);
        $this->forge->addKey('idStock', true);
        $this->forge->createTable('inventario');
    }

    public function down()
    {
        $this->forge->dropTable('inventario');
    }
}
