<?php
function chat() {

    $labels = array(
        'name'                  => _x( 'Chats', 'Post Type General Name', 'chat_text_domain' ),
        'singular_name'         => _x( 'Chat', 'Post Type Singular Name', 'chat_text_domain' ),
        'menu_name'             => __( 'Chats', 'chat_text_domain' ),
        'name_admin_bar'        => __( 'Chat', 'chat_text_domain' ),
        'archives'              => __( 'Chat Archives', 'chat_text_domain' ),
        'attributes'            => __( 'Chat Attributes', 'chat_text_domain' ),
        'parent_item_colon'     => __( 'Chat Parent Item:', 'chat_text_domain' ),
        'all_items'             => __( 'All Chat Items', 'chat_text_domain' ),
        'add_new_item'          => __( 'Add New Chat', 'chat_text_domain' ),
        'add_new'               => __( 'Add New', 'chat_text_domain' ),
        'new_item'              => __( 'New Chat', 'chat_text_domain' ),
        'edit_item'             => __( 'Edit Chat', 'chat_text_domain' ),
        'update_item'           => __( 'Update Chat', 'chat_text_domain' ),
        'view_item'             => __( 'View Chat', 'chat_text_domain' ),
        'view_items'            => __( 'View Chats', 'chat_text_domain' ),
        'search_items'          => __( 'Search Chat', 'chat_text_domain' ),
        'not_found'             => __( 'Not found', 'chat_text_domain' ),
        'not_found_in_trash'    => __( 'Not found in Trash', 'chat_text_domain' ),
        'featured_image'        => __( 'Featured Image', 'chat_text_domain' ),
        'set_featured_image'    => __( 'Set featured image', 'chat_text_domain' ),
        'remove_featured_image' => __( 'Remove featured image', 'chat_text_domain' ),
        'use_featured_image'    => __( 'Use as featured image', 'chat_text_domain' ),
        'insert_into_item'      => __( 'Insert into item', 'chat_text_domain' ),
        'uploaded_to_this_item' => __( 'Uploaded to this item', 'chat_text_domain' ),
        'items_list'            => __( 'Items list', 'chat_text_domain' ),
        'items_list_navigation' => __( 'Items list navigation', 'chat_text_domain' ),
        'filter_items_list'     => __( 'Filter items list', 'chat_text_domain' ),
    );
    $args = array(
        'label'                 => __( 'Chat', 'chat_text_domain' ),
        'description'           => __( 'Chat of multiple users', 'chat_text_domain' ),
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
    register_post_type( 'chat', $args );

}
add_action( 'init', 'chat', 0 );