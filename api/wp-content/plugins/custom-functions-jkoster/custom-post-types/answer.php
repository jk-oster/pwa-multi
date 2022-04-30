<?php
// Register Custom Post Type
function answer() {

    $labels = array(
        'name'                  => _x( 'Answers', 'Post Type General Name', 'answer_text_domain' ),
        'singular_name'         => _x( 'Answer', 'Post Type Singular Name', 'answer_text_domain' ),
        'menu_name'             => __( 'Answers', 'answer_text_domain' ),
        'name_admin_bar'        => __( 'Answer', 'answer_text_domain' ),
        'archives'              => __( 'Answer Archives', 'answer_text_domain' ),
        'attributes'            => __( 'Answer Attributes', 'answer_text_domain' ),
        'parent_item_colon'     => __( 'Answer Parent Item:', 'answer_text_domain' ),
        'all_items'             => __( 'All Answer Items', 'answer_text_domain' ),
        'add_new_item'          => __( 'Add New Answer', 'answer_text_domain' ),
        'add_new'               => __( 'Add New', 'answer_text_domain' ),
        'new_item'              => __( 'New Answer', 'answer_text_domain' ),
        'edit_item'             => __( 'Edit Answer', 'answer_text_domain' ),
        'update_item'           => __( 'Update Answer', 'answer_text_domain' ),
        'view_item'             => __( 'View Answer', 'answer_text_domain' ),
        'view_items'            => __( 'View Answers', 'answer_text_domain' ),
        'search_items'          => __( 'Search Answers', 'answer_text_domain' ),
        'not_found'             => __( 'Not found', 'answer_text_domain' ),
        'not_found_in_trash'    => __( 'Not found in Trash', 'answer_text_domain' ),
        'featured_image'        => __( 'Featured Image', 'answer_text_domain' ),
        'set_featured_image'    => __( 'Set featured image', 'answer_text_domain' ),
        'remove_featured_image' => __( 'Remove featured image', 'answer_text_domain' ),
        'use_featured_image'    => __( 'Use as featured image', 'answer_text_domain' ),
        'insert_into_item'      => __( 'Insert into item', 'answer_text_domain' ),
        'uploaded_to_this_item' => __( 'Uploaded to this item', 'answer_text_domain' ),
        'items_list'            => __( 'Items list', 'answer_text_domain' ),
        'items_list_navigation' => __( 'Items list navigation', 'answer_text_domain' ),
        'filter_items_list'     => __( 'Filter items list', 'answer_text_domain' ),
    );
    $args = array(
        'label'                 => __( 'Answer', 'answer_text_domain' ),
        'description'           => __( 'Answers of Questions', 'answer_text_domain' ),
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
    register_post_type( 'answer', $args );

}
add_action( 'init', 'answer', 0 );