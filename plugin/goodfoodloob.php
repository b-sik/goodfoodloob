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

class GoodFoodLoob {
    /**
     * Initialize plugin.
     *
     * @return void
     */
    public static function init(): void {
        register_activation_hook(__FILE__, [DB::class, 'create']);

        add_action('publish_post', [self::class, 'revalidate'], 10, 2);

        PostTypes::init();
        Routes::init();
    }

    public static function revalidate($post_ID, $post, $update): void {
        if (!in_array($post->post_type, ['post', 'recipes', 'events'])) return;

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;

        if ($post->post_status !== 'publish') return;

        $path = '/blog/' . ($post->post_type === 'post' ? 'posts' : $post->post_type) . '/' . $post_ID;
        $secret = 'qrxh0D7TVTqzT3r3uMyn';

        wp_remote_get("https://goodfoodloob.com/api/revalidate?secret={$secret}&path={$path}");
    }
}

GoodFoodLoob::init();
