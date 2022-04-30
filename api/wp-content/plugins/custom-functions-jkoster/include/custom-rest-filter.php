<?php

function standardRestQuery($args)
{
    $filters = [
        'relation' => 'AND',
    ];

    $ignoreParam = ['date', 'id', 'page', 'per_page', 'search', 'search_path', 'context', 'after', 'modified_after', 'before',
        'modified_before', 'exclude', 'include', 'offset', 'order', 'order_by', 'slug', 'status', 'sort', 'tags',
        'categories', 'link'];

    $likeParam = ['question', 'questions', 'course', 'answer', 'task', 'task_answer', 'chat', 'users', 'user_group'];

    foreach ($_GET as $key => $value) {
        if (!in_array($key, $ignoreParam)) {
            if (in_array($key, $likeParam)) {
                $filter = [
                    'key' => $key,
                    'value' => $value,
                    'compare' => 'LIKE'
                ];
            } else {
                $filter = [
                    'key' => $key,
                    'value' => $value,
                    'compare' => '='
                ];
            }
            $filters[] = $filter;
        }
    }

    $args['meta_query'] = $filters;

    return $args;
}

// Add Filter Functions to all Custom Post Types
add_filter('rest_course_query', function ($args) {
    return standardRestQuery($args);
});

add_filter('rest_question_query', function ($args) {
    return standardRestQuery($args);
});

add_filter('rest_chat_query', function ($args) {
    return standardRestQuery($args);
});

add_filter('rest_group_query', function ($args) {
    return standardRestQuery($args);
});

add_filter('rest_task_query', function ($args) {
    return standardRestQuery($args);
});

add_filter('rest_answer_query', function ($args) {
    return standardRestQuery($args);
});

add_filter('rest_task_answer_query', function ($args) {
    return standardRestQuery($args);
});

add_filter('rest_user_query', function ($args) {
    return standardRestQuery($args);
});

function mod_jwt_auth_token_before_dispatch( $data, $user ) {
    $user_info = get_user_by( 'email',  $user->data->user_email );
    $response = array(
        'token' => $data['token'],
        'id' => $user_info->id,
        'first_name' => $user_info->first_name,
        'last_name' => $user_info->last_name,
        'nicename' => $user->data->user_nicename,
        'display_name' => $user->data->display_name,
        'description' => $user->data->description,
        'group' => get_field( 'user_group', "user_$user_info->id" )[0],
    );
    return $response;
}
add_filter( 'jwt_auth_token_before_dispatch', 'mod_jwt_auth_token_before_dispatch', 10, 2 );

