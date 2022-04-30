<?php
/*
Plugin Name: Custom Functions Jakob Osterberger
Plugin URI: https://www.jkoster.com/contact
Description: Plugin for special Filter und Custom Post Types of MultiApp-PWA
Author: Jakob Osterberger
Author URI: https://www.jkoster.com
Version: 1.0

/* Verbiete den direkten Zugriff auf die Plugin-Datei */
if ( ! defined( 'ABSPATH' ) ) exit;
/* Nach dieser Zeile den Code einfügen*/

// Register Custom Post Types
foreach ( glob( plugin_dir_path( __FILE__ ) . "custom-post-types/*.php" ) as $file ) {
    include_once( $file );
}

// Register custom REST API filter
foreach ( glob( plugin_dir_path( __FILE__ ) . "include/*.php" ) as $file ) {
    include_once( $file );
}
