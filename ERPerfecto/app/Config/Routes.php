<?php

namespace Config;

use App\Controllers\ProductController;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');


$routes->group('inventario', function ($routes) {
    $routes->get('/', 'InventarioController::index',['as'=>'indexInventario']);
    //TODO: por los problemas que empezó a dar el método delete, es que prefiero por el momento dejarlo como post. Más adelante se verá
    $routes->delete('eliminar/(:any)', 'InventarioController::delete',['as' => 'eliminarProducto']);

    $routes->post('modificar/(:any)', 'InventarioController::edit/$1',['as' =>'editProducto']);
    $routes->match(['get', 'post'], 'addProduct', 'InventarioController::addProduct');
    $routes->post('addInventary','InventarioController::addInventary',['as' => 'addInventary']);
});


$routes->get('/deposito', 'DepositoController::index');

$routes->get('/personal', 'PersonalController::index');

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
