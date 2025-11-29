<?php

namespace GoodFoodLoob;

if (!defined('ABSPATH')) {
    exit;
}

class PostTypes
{
    public static function init(): void
    {
        add_action('init', [self::class, 'recipes_cpt'], 0);
        add_action('init', [self::class, 'events_cpt'], 0);
    }

    public static function recipes_cpt()
    {
        $labels = array(
            'name'                  => _x('Recipes', 'Post Type General Name', 'gfl'),
            'singular_name'         => _x('Recipe', 'Post Type Singular Name', 'gfl'),
            'menu_name'             => __('Recipes', 'gfl'),
            'name_admin_bar'        => __('Recipe', 'gfl'),
            'archives'              => __('Recipe Archives', 'gfl'),
            'attributes'            => __('Even Attributes', 'gfl'),
            'parent_item_colon'     => __('Parent Recipe:', 'gfl'),
            'all_items'             => __('All Recipes', 'gfl'),
            'add_new_item'          => __('Add New Recipe', 'gfl'),
            'add_new'               => __('Add New', 'gfl'),
            'new_item'              => __('New Recipe', 'gfl'),
            'edit_item'             => __('Edit Recipe', 'gfl'),
            'update_item'           => __('Update Recipe', 'gfl'),
            'view_item'             => __('View Recipe', 'gfl'),
            'view_items'            => __('View Recipes', 'gfl'),
            'search_items'          => __('Search Recipe', 'gfl'),
            'not_found'             => __('Not found', 'gfl'),
            'not_found_in_trash'    => __('Not found in Trash', 'gfl'),
            'featured_image'        => __('Featured Image', 'gfl'),
            'set_featured_image'    => __('Set featured image', 'gfl'),
            'remove_featured_image' => __('Remove featured image', 'gfl'),
            'use_featured_image'    => __('Use as featured image', 'gfl'),
            'insert_into_item'      => __('Insert into recipe', 'gfl'),
            'uploaded_to_this_item' => __('Uploaded to this recipe', 'gfl'),
            'items_list'            => __('Recipes list', 'gfl'),
            'items_list_navigation' => __('Recipes list navigation', 'gfl'),
            'filter_items_list'     => __('Filter recipes list', 'gfl'),
        );

        $args = array(
            'label'                 => __('Recipe', 'gfl'),
            'description'           => __('Recipe', 'gfl'),
            'labels'                => $labels,
            'supports'              => array('title', 'editor', 'thumbnail', 'comments', 'revisions', 'custom-fields', 'excerpt'),
            'taxonomies'            => array('recipes'),
            'hierarchical'          => false,
            'public'                => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 5,
            'menu_icon'             => 'dashicons-carrot',
            'show_in_admin_bar'     => true,
            'show_in_nav_menus'     => true,
            'can_export'            => true,
            'has_archive'           => true,
            'exclude_from_search'   => false,
            'publicly_queryable'    => true,
            'capability_type'       => 'post',
            'show_in_rest'          => true,
            'map_meta_cap'          => true
        );

        register_post_type('recipes', $args);
    }

    public static function events_cpt()
    {
        $labels = array(
            'name'                  => _x('Events', 'Post Type General Name', 'gfl'),
            'singular_name'         => _x('Event', 'Post Type Singular Name', 'gfl'),
            'menu_name'             => __('Events', 'gfl'),
            'name_admin_bar'        => __('Event', 'gfl'),
            'archives'              => __('Event Archives', 'gfl'),
            'attributes'            => __('Even Attributes', 'gfl'),
            'parent_item_colon'     => __('Parent Event:', 'gfl'),
            'all_items'             => __('All Events', 'gfl'),
            'add_new_item'          => __('Add New Event', 'gfl'),
            'add_new'               => __('Add New', 'gfl'),
            'new_item'              => __('New Event', 'gfl'),
            'edit_item'             => __('Edit Event', 'gfl'),
            'update_item'           => __('Update Event', 'gfl'),
            'view_item'             => __('View Event', 'gfl'),
            'view_items'            => __('View Events', 'gfl'),
            'search_items'          => __('Search Event', 'gfl'),
            'not_found'             => __('Not found', 'gfl'),
            'not_found_in_trash'    => __('Not found in Trash', 'gfl'),
            'featured_image'        => __('Featured Image', 'gfl'),
            'set_featured_image'    => __('Set featured image', 'gfl'),
            'remove_featured_image' => __('Remove featured image', 'gfl'),
            'use_featured_image'    => __('Use as featured image', 'gfl'),
            'insert_into_item'      => __('Insert into event', 'gfl'),
            'uploaded_to_this_item' => __('Uploaded to this event', 'gfl'),
            'items_list'            => __('Events list', 'gfl'),
            'items_list_navigation' => __('Events list navigation', 'gfl'),
            'filter_items_list'     => __('Filter events list', 'gfl'),
        );

        $args = array(
            'label'                 => __('Event', 'gfl'),
            'description'           => __('Event', 'gfl'),
            'labels'                => $labels,
            'supports'              => array('title', 'editor', 'thumbnail', 'comments', 'revisions', 'custom-fields', 'excerpt'),
            'taxonomies'            => array('events'),
            'hierarchical'          => false,
            'public'                => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 5,
            'menu_icon'             => 'dashicons-calendar',
            'show_in_admin_bar'     => true,
            'show_in_nav_menus'     => true,
            'can_export'            => true,
            'has_archive'           => true,
            'exclude_from_search'   => false,
            'publicly_queryable'    => true,
            'capability_type'       => 'post',
            'show_in_rest'          => true,
            'map_meta_cap'          => true
        );

        register_post_type('events', $args);
    }
}
