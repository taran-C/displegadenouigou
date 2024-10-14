<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');


use App\Controllers\Explainers;

$routes->get('explainers', [Explainers::class, 'index']);
$routes->get('explainers/(:segment)', [Explainers::class, 'view']);