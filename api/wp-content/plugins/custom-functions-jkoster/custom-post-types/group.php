<?php
// Register Custom Post Type
function group() {

    $labels = array(
        'name'                  => _x( 'Groups', 'Post Type General Name', 'group_text_domain' ),
        'singular_name'         => _x( 'Group', 'Post Type Singular Name', 'group_text_domain' ),
        'menu_name'             => __( 'Groups', 'group_text_domain' ),
        'name_admin_bar'        => __( 'Group', 'group_text_domain' ),
        'archives'              => __( 'Group Archives', 'group_text_domain' ),
        'attributes'            => __( 'Group Attributes', 'group_text_domain' ),
        'parent_item_colon'     => __( 'Group Parent Item:', 'group_text_domain' ),
        'all_items'             => __( 'All Task Groups', 'group_text_domain' ),
        'add_new_item'          => __( 'Add New Group', 'group_text_domain' ),
        'add_new'               => __( 'Add New', 'group_text_domain' ),
        'new_item'              => __( 'New Group', 'group_text_domain' ),
        'edit_item'             => __( 'Edit Group', 'group_text_domain' ),
        'update_item'           => __( 'Update Group', 'group_text_domain' ),
        'view_item'             => __( 'View Group', 'group_text_domain' ),
        'view_items'            => __( 'View Groups', 'group_text_domain' ),
        'search_items'          => __( 'Search Groups', 'group_text_domain' ),
        'not_found'             => __( 'Not found', 'group_text_domain' ),
        'not_found_in_trash'    => __( 'Not found in Trash', 'group_text_domain' ),
        'featured_image'        => __( 'Featured Image', 'group_text_domain' ),
        'set_featured_image'    => __( 'Set featured image', 'group_text_domain' ),
        'remove_featured_image' => __( 'Remove featured image', 'group_text_domain' ),
        'use_featured_image'    => __( 'Use as featured image', 'group_text_domain' ),
        'insert_into_item'      => __( 'Insert into item', 'group_text_domain' ),
        'uploaded_to_this_item' => __( 'Uploaded to this item', 'group_text_domain' ),
        'items_list'            => __( 'Items list', 'group_text_domain' ),
        'items_list_navigation' => __( 'Items list navigation', 'group_text_domain' ),
        'filter_items_list'     => __( 'Filter items list', 'group_text_domain' ),
    );
    $args = array(
        'label'                 => __( 'Group', 'group_text_domain' ),
        'description'           => __( 'Groups of users', 'group_text_domain' ),
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
    register_post_type( 'group', $args );

}
add_action( 'init', 'group', 0 );