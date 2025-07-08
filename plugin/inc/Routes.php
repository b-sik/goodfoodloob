<?php

namespace GoodFoodLoob;

if (!defined('ABSPATH')) {
    exit;
}

class Routes
{
    public static function init(): void
    {
        /**
        * CORS configuration.
        */
        $origins = getenv('ORIGINS');
        add_action('init', function () {
            if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' && $origins !== false) {
                header('Access-Control-Allow-Origin: ' . $origins);
                header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
                header('Access-Control-Allow-Headers: Content-Type');
                header('Access-Control-Allow-Credentials: true');
                http_response_code(200);
            }
        }, 15);

        /**
        * Register endpoint.
        */
        add_action('rest_api_init', function () {
            register_rest_route('gfl/v1', '/subscribe', array(
                'methods' => ['OPTIONS', 'POST'],
                'callback' => [self::class, 'handle_signup'],
                'permission_callback' => '__return_true',
            ));
        });
    }

    public static function handle_signup($request)
    {
        global $wpdb;

        $params = $request->get_json_params();
        $email = isset($params['email']) ? sanitize_email($params['email']) : '';
        $name = isset($params['name']) ? sanitize_text_field($params['name']) : '';
        $form = isset($params['form']) ? sanitize_text_field($params['form']) : '';

        if (!is_email($email)) {
            return new \WP_REST_Response([
                'success' => false,
                'message' => 'Invalid email address.'
            ], 400);
        }

        $table = $wpdb->prefix . 'goodfoodloob';
        $wpdb->insert($table, [
          'email' => $email,
          'name' => $name,
          'form' => $form
        ]);

        return new \WP_REST_Response([
            'success' => true,
            'message' => 'Successfully subscribed.',
            'table' => $table
        ], 200);
    }
}
