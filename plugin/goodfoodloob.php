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

$dotenv = \Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

class GoodFoodLoob
{
    /**
     * Initialize plugin.
     *
     * @return void
     */
    public static function init(): void
    {
        register_activation_hook(__FILE__, [DB::class, 'create']);

        add_action('publish_post', [self::class, 'revalidate'], 10, 2);
        add_filter('preview_post_link', [self::class, 'preview_draft_link'], 10, 2);

        // https://github.com/WordPress/gutenberg/issues/13998
        add_filter('rest_prepare_post', [self::class, 'modify_preview_link_if_draft'], 10, 3);
        add_filter('rest_prepare_recipes', [self::class, 'modify_preview_link_if_draft'], 10, 3);
        add_filter('rest_prepare_events', [self::class, 'modify_preview_link_if_draft'], 10, 3);

        PostTypes::init();
        Routes::init();
    }

    public static function revalidate($post_ID, $post): void
    {
        if (!in_array($post->post_type, ['post', 'recipes', 'events'])) {
            return;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if ($post->post_status !== 'publish') {
            return;
        }

        $path = '/blog/' . ($post->post_type === 'post' ? 'posts' : $post->post_type) . '/' . $post_ID;

        wp_remote_get($_ENV['FRONTEND_URL'] . "/api/revalidate?secret={$_ENV['REVALIDATE_SECRET']}&path={$path}");
    }

    public static function preview_draft_link($preview_link, $post)
    {
        return add_query_arg([
            'secret' => $_ENV['PREVIEW_SECRET'],
            'nonce' => wp_create_nonce('wp_rest'),
            'id' => $post->ID,
            'type' => $post->post_type === 'post' ? 'posts' : $post->post_type
        ], $_ENV['FRONTEND_URL'] . '/api/preview');
    }

    public static function modify_preview_link_if_draft($response, $post, $request)
    {
        if ($request->get_param('context') === 'edit' && $post->post_status === 'draft') {
            $data = $response->get_data();

            $data['link'] = add_query_arg([
                'secret' => $_ENV['PREVIEW_SECRET'],
                'nonce' => wp_create_nonce('wp_rest'),
                'id' => $post->ID,
                'type' => $post->post_type === 'post' ? 'posts' : $post->post_type
            ], $_ENV['FRONTEND_URL'] . '/api/preview');

            $response->set_data($data);
        }
        return $response;
    }
}

add_action('plugins_loaded', ['GoodFoodLoob\GoodFoodLoob', 'init']);
