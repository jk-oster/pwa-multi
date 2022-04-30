<?php
// Register Custom Post Type
function course() {

    $labels = array(
        'name'                  => _x( 'Courses', 'Post Type General Name', 'course_text_domain' ),
        'singular_name'         => _x( 'Course', 'Post Type Singular Name', 'course_text_domain' ),
        'menu_name'             => __( 'Courses', 'course_text_domain' ),
        'name_admin_bar'        => __( 'Course', 'course_text_domain' ),
        'archives'              => __( 'Course Archives', 'course_text_domain' ),
        'attributes'            => __( 'Course Attributes', 'course_text_domain' ),
        'parent_item_colon'     => __( 'Course Parent Item:', 'course_text_domain' ),
        'all_items'             => __( 'All Task Courses', 'course_text_domain' ),
        'add_new_item'          => __( 'Add New Course', 'course_text_domain' ),
        'add_new'               => __( 'Add New', 'course_text_domain' ),
        'new_item'              => __( 'New Course', 'course_text_domain' ),
        'edit_item'             => __( 'Edit Course', 'course_text_domain' ),
        'update_item'           => __( 'Update Course', 'course_text_domain' ),
        'view_item'             => __( 'View Course', 'course_text_domain' ),
        'view_items'            => __( 'View Courses', 'course_text_domain' ),
        'search_items'          => __( 'Search Courses', 'course_text_domain' ),
        'not_found'             => __( 'Not found', 'course_text_domain' ),
        'not_found_in_trash'    => __( 'Not found in Trash', 'course_text_domain' ),
        'featured_image'        => __( 'Featured Image', 'course_text_domain' ),
        'set_featured_image'    => __( 'Set featured image', 'course_text_domain' ),
        'remove_featured_image' => __( 'Remove featured image', 'course_text_domain' ),
        'use_featured_image'    => __( 'Use as featured image', 'course_text_domain' ),
        'insert_into_item'      => __( 'Insert into item', 'course_text_domain' ),
        'uploaded_to_this_item' => __( 'Uploaded to this item', 'course_text_domain' ),
        'items_list'            => __( 'Items list', 'course_text_domain' ),
        'items_list_navigation' => __( 'Items list navigation', 'course_text_domain' ),
        'filter_items_list'     => __( 'Filter items list', 'course_text_domain' ),
    );
    $args = array(
        'label'                 => __( 'Course', 'course_text_domain' ),
        'description'           => __( 'Courses', 'course_text_domain' ),
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
    register_post_type( 'course', $args );

}
add_action( 'init', 'course', 0 );