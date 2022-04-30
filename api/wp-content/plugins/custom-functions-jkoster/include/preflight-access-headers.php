<?php
add_action('rest_api_init', function () {
    $origin = get_http_origin();
    if ($origin == 'http://localhost:8080' || $origin == 'https://app.s2010456022.student.kwmhgb.at/') {
        // You can set more specific domains if you need
        // header("Access-Control-Allow-Origin: " . $origin);
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
        header("Access-Control-Allow-Credentials: true");
        header('Access-Control-Allow-Headers: Authorization, X-WP-Nonce, Content-Type, X-Requested-With');

        if ('OPTIONS' == $_SERVER['REQUEST_METHOD']) {
            status_header(200);
            exit();
        }
    }
});