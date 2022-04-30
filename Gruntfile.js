module.exports = function(grunt) {

    // const mozjpeg = require('imagemin-mozjpeg');

    grunt.initConfig({
        concat: {
            dist: {
                src: ['src/js/pwa.js'],
                dest: 'app/js/pwa.js',
            },
        },
        uglify: {
            dist: {
                files: {
                    'app/js/pwa.min.js': ['app/js/pwa.js'],
                },
            },
        },
        watch: {
            css: {
                files: 'src/scss/*.scss',
                tasks: ['sass', 'autoprefixer', 'cssmin'],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: 'src/js/*.js',
                tasks: ['concat', 'uglify'],
                options: {
                    livereload: true,
                },
            }
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded',
                    
                },
                files: {                         // Dictionary of files
                    'app/css/styles.css': 'src/scss/main.scss',       // 'destination': 'source'
                },
            },
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'app/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'app/css',
                    ext: '.min.css'
                }],
            },
        },
        uncss: {
            dist: {
                options: {
                    ignore: ['#added_at_runtime', '.created_by_jQuery']
                },
                files: {
                    'app/css/tidy.css': ['app/index.html'],
                },
            },
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,jpeg,gif}'],
                    dest: 'app/images/',
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: [
                    'last 3 versions',
                    'ie >= 9',
                    'Android >= 2.3',
                    'ChromeAndroid > 20',
                    'FirefoxAndroid > 20',
                    'iOS >= 8',
                ],
                diff: true,
            },
            dist:{
                files:{
                    'app/css/main.css':'app/css/main.css'
                },
            },
        },
    });

    // grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'concat', 'uglify']);
};