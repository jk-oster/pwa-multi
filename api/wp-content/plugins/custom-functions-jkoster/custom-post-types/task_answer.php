<?php
// Register Custom Post Type
function task_answer() {

    $labels = array(
        'name'                  => _x( 'Task Answers', 'Post Type General Name', 'task_answer_text_domain' ),
        'singular_name'         => _x( 'Task Answer', 'Post Type Singular Name', 'task_answer_text_domain' ),
        'menu_name'             => __( 'Task Answers', 'task_answer_text_domain' ),
        'name_admin_bar'        => __( 'Task Answer', 'task_answer_text_domain' ),
        'archives'              => __( 'Task Answer Archives', 'task_answer_text_domain' ),
        'attributes'            => __( 'Task Answer Attributes', 'task_answer_text_domain' ),
        'parent_item_colon'     => __( 'Task Answer Parent Item:', 'task_answer_text_domain' ),
        'all_items'             => __( 'All Task Answer Items', 'task_answer_text_domain' ),
        'add_new_item'          => __( 'Add New Task Answer', 'task_answer_text_domain' ),
        'add_new'               => __( 'Add New', 'task_answer_text_domain' ),
        'new_item'              => __( 'New Task Answer', 'task_answer_text_domain' ),
        'edit_item'             => __( 'Edit Task Answer', 'task_answer_text_domain' ),
        'update_item'           => __( 'Update Task Answer', 'task_answer_text_domain' ),
        'view_item'             => __( 'View Task Answer', 'task_answer_text_domain' ),
        'view_items'            => __( 'View Task Answers', 'task_answer_text_domain' ),
        'search_items'          => __( 'Search Task Answers', 'task_answer_text_domain' ),
        'not_found'             => __( 'Not found', 'task_answer_text_domain' ),
        'not_found_in_trash'    => __( 'Not found in Trash', 'task_answer_text_domain' ),
        'featured_image'        => __( 'Featured Image', 'task_answer_text_domain' ),
        'set_featured_image'    => __( 'Set featured image', 'task_answer_text_domain' ),
        'remove_featured_image' => __( 'Remove featured image', 'task_answer_text_domain' ),
        'use_featured_image'    => __( 'Use as featured image', 'task_answer_text_domain' ),
        'insert_into_item'      => __( 'Insert into item', 'task_answer_text_domain' ),
        'uploaded_to_this_item' => __( 'Uploaded to this item', 'task_answer_text_domain' ),
        'items_list'            => __( 'Items list', 'task_answer_text_domain' ),
        'items_list_navigation' => __( 'Items list navigation', 'task_answer_text_domain' ),
        'filter_items_list'     => __( 'Filter items list', 'task_answer_text_domain' ),
    );
    $args = array(
        'label'                 => __( 'Task Answer', 'task_answer_text_domain' ),
        'description'           => __( 'Answers of Tasks', 'task_answer_text_domain' ),
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
    register_post_type( 'task_answer', $args );

}
add_action( 'init', 'task_answer', 0 );
