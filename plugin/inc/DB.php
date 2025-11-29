<?php

namespace GoodFoodLoob;

if (!defined('ABSPATH')) {
    exit;
}

class DB
{
    public static function create()
    {
        global $wpdb;

        $table_name = $wpdb->prefix . $_ENV['DB_NAME_NO_PREFIX'];

        // Check if table exists
        if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") !== $table_name) {
            require_once ABSPATH . 'wp-admin/includes/upgrade.php';

            $charset_collate = $wpdb->get_charset_collate();

            $sql = "CREATE TABLE $table_name (
                id mediumint(9) NOT NULL AUTO_INCREMENT,
                name varchar(100) NOT NULL,
                email varchar(100) NOT NULL,
                form varchar(100) NOT NULL,
                created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
                PRIMARY KEY  (id)
            ) $charset_collate;";

            dbDelta($sql);
        }
    }
}
