<?php
// Register Custom Post Type
function question() {

    $labels = array(
        'name'                  => _x( 'Questions', 'Post Type General Name', 'question_text_domain' ),
        'singular_name'         => _x( 'Question', 'Post Type Singular Name', 'question_text_domain' ),
        'menu_name'             => __( 'Questions', 'question_text_domain' ),
        'name_admin_bar'        => __( 'Question', 'question_text_domain' ),
        'archives'              => __( 'Question Archives', 'question_text_domain' ),
        'attributes'            => __( 'Question Attributes', 'question_text_domain' ),
        'parent_item_colon'     => __( 'Question Parent Item:', 'question_text_domain' ),
        'all_items'             => __( 'All Task Questions', 'question_text_domain' ),
        'add_new_item'          => __( 'Add New Question', 'question_text_domain' ),
        'add_new'               => __( 'Add New', 'question_text_domain' ),
        'new_item'              => __( 'New Question', 'question_text_domain' ),
        'edit_item'             => __( 'Edit Question', 'question_text_domain' ),
        'update_item'           => __( 'Update Question', 'question_text_domain' ),
        'view_item'             => __( 'View Question', 'question_text_domain' ),
        'view_items'            => __( 'View Questions', 'question_text_domain' ),
        'search_items'          => __( 'Search Questions', 'question_text_domain' ),
        'not_found'             => __( 'Not found', 'question_text_domain' ),
        'not_found_in_trash'    => __( 'Not found in Trash', 'question_text_domain' ),
        'featured_image'        => __( 'Featured Image', 'question_text_domain' ),
        'set_featured_image'    => __( 'Set featured image', 'question_text_domain' ),
        'remove_featured_image' => __( 'Remove featured image', 'question_text_domain' ),
        'use_featured_image'    => __( 'Use as featured image', 'question_text_domain' ),
        'insert_into_item'      => __( 'Insert into item', 'question_text_domain' ),
        'uploaded_to_this_item' => __( 'Uploaded to this item', 'question_text_domain' ),
        'items_list'            => __( 'Items list', 'question_text_domain' ),
        'items_list_navigation' => __( 'Items list navigation', 'question_text_domain' ),
        'filter_items_list'     => __( 'Filter items list', 'question_text_domain' ),
    );
    $args = array(
        'label'                 => __( 'Question', 'question_text_domain' ),
        'description'           => __( 'Questions', 'question_text_domain' ),
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
    register_post_type( 'question', $args );

}
add_action( 'init', 'question', 0 );