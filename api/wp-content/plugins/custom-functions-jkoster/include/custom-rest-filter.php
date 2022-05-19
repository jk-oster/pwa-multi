<?php

function standardRestQuery($args)
{
    $filters = [
        'relation' => 'AND',
    ];

    $ignoreParam = ['date', 'id', 'page', 'per_page', 'search', 'search_path', 'context', 'after', 'modified_after', 'before',
        'modified_before', 'exclude', 'include', 'offset', 'order', 'order_by', 'orderby', 'slug', 'status', 'sort', 'tags',
        'categories', 'link', 'filter'];

    $likeParam = ['question', 'questions', 'course', 'answer', 'task', 'task_answer', 'chat', 'users', 'user_group', 'user_image', 'user_chat'];

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


/**
 * Fix to allow ACF field update on users
 * https://github.com/airesvsg/acf-to-rest-api-example/issues/1
 */
// Allow current user to update own profile
add_filter('acf/rest_api/item_permissions/update', function ($permission, $request, $type) {
    if ('user' == $type && method_exists($request, 'get_param') && get_current_user_id() == $request->get_param('id')) {
        return true;
    }
    return $permission;
}, 10, 3);

// Allow user acf rest user update to be detected as location "user_form".
add_filter('acf/location/screen', function ($screen, $deprecated) {
    if (!empty($screen['post_id']) && preg_match("/^user_\d+$/i", $screen['post_id'])) {
        $screen = wp_parse_args($screen, array(
            'user_form' => 'edit'
        ));
    }
    return $screen;
}, 10, 2);

/**
 * Prevent all not authorized access to WP REST API except JWT Token Request
 */
add_filter('rest_dispatch_request', function ($dispatch_result, $request,
                                              $route, $handler) {
    if (!is_user_logged_in() && $route !== "/jwt-auth/v1/token") {
        $dispatch_result = new WP_Error(
            'rest_not_logged_in',
            __("Please login <a href='https://app.s2010456022.student.kwmhgb.at/#/login'>here</a> to access. Your login may be outdated."),
            array('status' => 401)
        );
    }

    $blacklist = array("/wp/v2/users", "/acf/v3/users");
    if (in_array($route, $blacklist)) {
        $dispatch_result = new WP_Error(
            'rest_no_permission',
            __("Sorry, you don't have permission to do that."),
            array('status' => 403)
        );
    }

    return $dispatch_result;
}, 10, 4);

function mod_jwt_auth_token_before_dispatch($data, $user)
{
    $user_info = get_user_by('email', $user->data->user_email);

    $response = array(
        'token' => $data['token'],
        'id' => $user_info->id,
        'first_name' => $user_info->first_name,
        'last_name' => $user_info->last_name,
        // 'nicename' => $user->data->user_nicename,
        'nickname' => $user_info->nickname,
        'display_name' => $user->data->display_name,
        'group' => get_field('user_group', "user_$user_info->id")[0],
        'description' => $user_info->description,
        // 'user_description' => get_field( 'user_description', "user_$user_info->id" ),
        'image' => get_field('user_image', "user_$user_info->id"),
        'user_info' => getUserInfo($user_info->id),
        'chat_info' => getChatInfoOfUser($user_info->id),
        'group_info' => getGroupInfo(get_field('user_group', "user_$user_info->id")[0]),
    );
    return $response;
}

add_filter('jwt_auth_token_before_dispatch', 'mod_jwt_auth_token_before_dispatch', 10, 2);


/**
 * Custom REST API Endpoint
 * https://awhitepixel.com/blog/in-depth-guide-in-creating-and-fetching-custom-wp-rest-api-endpoints/
 */
add_action('rest_api_init', function () {
    register_rest_route('jkoster/v1', '/userchat', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'jkoster_rest_route_get_userchat',
    ]);
    register_rest_route('jkoster/v1', '/usergroup', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'jkoster_rest_route_get_usergroup',
    ]);
    register_rest_route('jkoster/v1', '/nextavailableuser', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'jkoster_rest_route_get_nextavailableuser',
    ]);
    register_rest_route('jkoster/v1', '/userinfo', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'jkoster_rest_route_get_userinfo',
    ]);
    register_rest_route('jkoster/v1', '/newquestion', [
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'jkoster_rest_route_get_newquestion',
    ]);
});

function jkoster_rest_route_get_usergroup(): WP_REST_Response
{
    $userGroupId = get_field('user_group', "user_" . get_current_user_id())[0];
    $response = getGroupInfo($userGroupId);
    if (empty($response)) {
        return new WP_REST_Response([
            'message' => "No available user in matched_group $userGroupId found.",
        ], 400);
    }
    return new WP_REST_Response($response, 200);
}

function jkoster_rest_route_get_userchat(): WP_REST_Response
{
    $userId = get_current_user_id();
    $response = getChatInfoOfUser($userId);
    if (empty($response)) {
        return new WP_REST_Response([
            'message' => "No chat for user $userId found.",
        ], 400);
    }
    return new WP_REST_Response($response, 200);
}

function jkoster_rest_route_get_nextavailableuser(): WP_REST_Response
{
    $response = nextAvailableUser();
    if (empty($response)) {
        return new WP_REST_Response([
            'message' => "No available user in matched_group found.",
        ], 400);
    }
    return new WP_REST_Response($response, 200);
}

function jkoster_rest_route_get_userinfo(): WP_REST_Response
{
    $userId = get_current_user_id();
    $response = getUserInfo($userId);
    if (empty($response)) {
        return new WP_REST_Response([
            'message' => "No user_info for user $userId found.",
        ], 400);
    }
    return new WP_REST_Response($response, 200);
}

function jkoster_rest_route_get_newquestion(): WP_REST_Response
{
    $userId = get_current_user_id();
    $response = getNewQuestion($userId);
    if (empty($response)) {
        return new WP_REST_Response([
            'message' => "No more questions found for user $userId found.",
        ], 400);
    }
    return new WP_REST_Response($response, 200);
}

function getNewQuestion($userId): array
{
    $groupId = getUserInfo(get_current_user_id())['group'];
    $currentCourseId = getGroupInfo($groupId)['course'];
    $chatInfo = getChatInfoOfUser($userId);
    $currentQuestions = $chatInfo['questions'] ? $chatInfo['questions'] : [];

    if (!$userId) return [];
    $args = array(
        'numberposts' => -1,
        'post_type' => 'question',
        'meta_query' => array(
            'relation' => 'AND',
            array(
                'key' => 'course',
                'compare' => 'LIKE',
                'value' => $currentCourseId,
            )
        ),
    );

    $query = new WP_Query($args);

    $array = [];
    if ($query->have_posts()) {
        $counter = 0;
        while ($query->have_posts()) {
            $query->the_post();
            $array[$counter]['id'] = get_the_ID();
            $array[$counter]['date'] = get_the_date();
            $array[$counter]['question'] = get_field('question');
            $array[$counter]['description'] = get_field('description');
            $array[$counter]['course'] = get_field('course')[0];
            $array[$counter]['answers'] = [];
            $counter++;
        }
    }
    foreach ($array as $key => $question) {
        if (in_array($question['id'], $currentQuestions) && $currentCourseId === $question['course']) {
            unset($array[$key]);
        }
    }

    wp_reset_postdata();

    // Add Question to Chat
    if (!empty($array)) {
        $key = key($array);
        $currentQuestions[] = $array[$key]['id'];
        update_field('questions', $currentQuestions, $chatInfo['id']);
    }

    return empty($array) ? [] : reset($array);
}

function getChatInfoOfUser($userId)
{
    if (!$userId) return null;
    $args = array(
        'numberposts' => -1,
        'post_type' => 'chat',
        'meta_query' => array(
            'relation' => 'AND',
            array(
                'key' => 'users',
                'compare' => 'LIKE',
                'value' => $userId,
            )
        ),
    );

    $query = new WP_Query($args);

    $array = [];
    if ($query->have_posts()) {
        $counter = 0;
        while ($query->have_posts()) {
            $query->the_post();
            $array[$counter]['id'] = get_the_ID();
            $array[$counter]['title'] = get_the_title();
            $array[$counter]['userIds'] = get_field('users');
            $array[$counter]['startdate'] = get_field('startdate');
            $userArray = [];
            foreach (get_field('users') as $userId) {
                $userArray[] = getUserInfo($userId);
            }
            $array[$counter]['users'] = $userArray;
            $array[$counter]['questions'] = get_field('questions');
            $array[$counter]['tasks'] = get_field('tasks');
            $counter++;
        }
    }

    foreach ($array as $key => $chat) {
        if (!in_array($userId, $chat['userIds'])) {
            unset($array[$key]);
        }
    }

    wp_reset_postdata();
    return reset($array);
}

function getGroupInfo($groupId)
{
    if (!$groupId) return null;
    $args = array(
        'post_type' => 'group',
        'p' => $groupId,
    );

    $query = new WP_Query($args);

    $array = [];
    if ($query->have_posts()) {
        $counter = 0;
        while ($query->have_posts()) {
            $query->the_post();
            $array[$counter]['id'] = get_the_ID();
            $array[$counter]['name'] = get_field('name');
            $array[$counter]['users'] = get_field('users');
            $array[$counter]['admin'] = get_field('admin')[0];
            $array[$counter]['country'] = get_field('country');
            $array[$counter]['course'] = get_field('course')[0];
            $array[$counter]['school'] = get_field('school');
            $array[$counter]['matched_group'] = get_field('matched_group')[0];
            $counter++;
        }
    }

    wp_reset_postdata();
    return reset($array);
}

function nextAvailableUser(): array
{
    $currentUserGroup = getUserInfo(get_current_user_id())['group'];
    $matched_group = getGroupInfo($currentUserGroup)['matched_group'];
    $users = getGroupInfo($matched_group)['users'];
    foreach ($users as $user) {
        if (empty(getChatInfoOfUser($user)))
            return ['id' => $user, 'user_info' => getUserInfo($user)];
    }
    return [];
}

function getUserInfo($userId): array
{
    if (!$userId) return [];
    $user = get_user_by('id', $userId);
    $result = [];
    $result['id'] = $userId;
    $result['nickname'] = $user->nickname;
    $result['description'] = $user->description;
    $result['group'] = get_field('user_group', "user_$userId")[0];
    $image = get_field('user_image', "user_$userId");
    $result['image']['id'] = $image['id'];
    $result['image']['sizes'] = $image['sizes'];
    return $result;
}