<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

$routes->get('/pdv', 'PosController::index');

$routes->post('/pdv/pesquisar-produto', 'PosController::searchItem');

$routes->get('/painel-administrador/login', 'PanelController::login');

$routes->post('/painel-administrador/auth', 'PanelController::auth');

$routes->get('/painel-administrador', 'PanelController::index');
