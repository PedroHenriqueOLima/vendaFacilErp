<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->get('/pdv', 'PosController::index');

$routes->post('/pdv/pesquisar-produto', 'PosController::searchItem');
