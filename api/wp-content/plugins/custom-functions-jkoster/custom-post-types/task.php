<?php
// Register Custom Post Type
function task() {

    $labels = array(
        'name'                  => _x( 'Tasks', 'Post Type General Name', 'task_text_domain' ),
        'singular_name'         => _x( 'Task', 'Post Type Singular Name', 'task_text_domain' ),
        'menu_name'             => __( 'Tasks', 'task_text_domain' ),
        'name_admin_bar'        => __( 'Task', 'task_text_domain' ),
        'archives'              => __( 'Task Archives', 'task_text_domain' ),
        'attributes'            => __( 'Task Attributes', 'task_text_domain' ),
        'parent_item_colon'     => __( 'Task Parent Item:', 'task_text_domain' ),
        'all_items'             => __( 'All Task Items', 'task_text_domain' ),
        'add_new_item'          => __( 'Add New Task', 'task_text_domain' ),
        'add_new'               => __( 'Add New', 'task_text_domain' ),
        'new_item'              => __( 'New Task', 'task_text_domain' ),
        'edit_item'             => __( 'Edit Task', 'task_text_domain' ),
        'update_item'           => __( 'Update Task', 'task_text_domain' ),
        'view_item'             => __( 'View Task', 'task_text_domain' ),
        'view_items'            => __( 'View Tasks', 'task_text_domain' ),
        'search_items'          => __( 'Search Tasks', 'task_text_domain' ),
        'not_found'             => __( 'Not found', 'task_text_domain' ),
        'not_found_in_trash'    => __( 'Not found in Trash', 'task_text_domain' ),
        'featured_image'        => __( 'Featured Image', 'task_text_domain' ),
        'set_featured_image'    => __( 'Set featured image', 'task_text_domain' ),
        'remove_featured_image' => __( 'Remove featured image', 'task_text_domain' ),
        'use_featured_image'    => __( 'Use as featured image', 'task_text_domain' ),
        'insert_into_item'      => __( 'Insert into item', 'task_text_domain' ),
        'uploaded_to_this_item' => __( 'Uploaded to this item', 'task_text_domain' ),
        'items_list'            => __( 'Items list', 'task_text_domain' ),
        'items_list_navigation' => __( 'Items list navigation', 'task_text_domain' ),
        'filter_items_list'     => __( 'Filter items list', 'task_text_domain' ),
    );
    $args = array(
        'label'                 => __( 'Task', 'task_text_domain' ),
        'description'           => __( 'Tasks', 'task_text_domain' ),
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor', 'custom-fields' ),
        'taxonomies'            => array( 'category', 'post_tag' ),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
    );
    register_post_type( 'task', $args );

}
add_action( 'init', 'task', 0 );