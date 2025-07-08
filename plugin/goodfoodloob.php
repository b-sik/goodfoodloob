<?php

/**
 * Plugin Name:     GoodFoodLoob
 * Plugin URI:      https://goodfoodloob.com
 * Description:     Headless WP backend customizations.
 * Author:          Brian Siklinski
 * Author URI:      https://bsik.net
 * Text Domain:     gfl
 * Version:         0.1.0
 */

namespace GoodFoodLoob;

if (!defined('ABSPATH')) {
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';

use GoodFoodLoob\DB;
use GoodFoodLoob\PostTypes;
use GoodFoodLoob\Routes;
use Dotenv\Dotenv;

class GoodFoodLoob
{
    /**
     * Initialize plugin.
     *
     * @return void
     */
    public static function init(): void
    {
        $dotenv = Dotenv::createImmutable(__DIR__);
        $dotenv->load();

        register_activation_hook(__FILE__, [DB::class, 'create']);

        PostTypes::init();
        Routes::init();
    }
}

GoodFoodLoob::init();
