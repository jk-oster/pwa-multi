module.exports = function (grunt) {

    // const mozjpeg = require('imagemin-mozjpeg');

    grunt.initConfig({
        concat: {
            dist: {
                src: ['src/js/pwa.js'],
                dest: 'app/js/pwa.js',
            },
        },
        terser: {
            dist: {
                options: {
                    compress: true,
                    safari10: true,
                    ecma: 2018,
                    sourceMap: {
                        includeSources: true,
                    },
                },
                files: [
                    {
                        expand: true,
                        src: ['*.js', '!*.min.js'],
                        dest: './app',
                        cwd: './src',
                        ext: '.min.js',
                    },
                ],
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
                tasks: ['terser'],
                options: {
                    livereload: true,
                },
            },
            views : {
                files: 'src/views/*.js',
                tasks: ['terser'],
                options: {
                    livereload: true,
                },
            },
            templates : {
                files: 'src/templates/*.tpl',
                tasks: ['copy'],
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
                    'app/css/main.css': 'src/scss/main.scss',       // 'destination': 'source'
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
        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, src: ['src/templates'], dest: 'app/templates', filter: 'isFile'},
                ]
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
            dist: {
                files: {
                    'app/css/main.css': 'app/css/main.css'
                },
            },
        },
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-terser');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'copy', 'terser']);
};