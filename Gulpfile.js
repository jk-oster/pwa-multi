const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
// const imagemin = require('gulp-imagemin');
const minifyHTML = require('gulp-htmlmin');
const stripComments = require('gulp-strip-comments');
const jsHint = require('gulp-jshint');
const sass = require('gulp-sass')(require('sass'));

const distDir = 'app';
const srcDir = 'src';

function lint(done) {
    gulp.src([srcDir + '/js/*.js*', srcDir + '/views/*.js*', srcDir + '/views/components/*.js*'])
        .pipe(jsHint({esnext: true}))
        .pipe(jsHint.reporter('default'));
    done();
}

exports.lint = lint;

// minify HTML pages

function html() {
    return gulp.src(srcDir + '/*.html')
        .pipe(stripComments())
        .pipe(minifyHTML({collapseWhitespace: true}))
        .pipe(gulp.dest(distDir));
}

exports.html = html;

/*
 * SCSS and CSS
 */

function scss() {
    return gulp.src(srcDir + '/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(distDir+'/css'));
}

exports.scss = scss;

function css() {
    return gulp.src(srcDir + '/scss/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(distDir+'/css'));
}

exports.css = css;

/*
 * JS files
 */

function js() {
    return gulp.src([srcDir + '/js/*.js'])
        .pipe(stripComments())
        .pipe(uglify())
        .pipe(gulp.dest(distDir+'/js'));
}

exports.js = js;

function views() {
    return gulp.src([srcDir + '/views/*.js'])
        .pipe(stripComments())
        .pipe(uglify())
        .pipe(gulp.dest(distDir+'/views'));
}

exports.views = views;

function comp() {
    return gulp.src([srcDir + '/views/components/*.js'])
        .pipe(stripComments())
        .pipe(uglify())
        .pipe(gulp.dest(distDir+'/views/components'));
}

exports.comp = comp;

function serv() {
    return gulp.src([srcDir + '/*.js'])
        .pipe(stripComments())
        .pipe(uglify())
        .pipe(gulp.dest(distDir));
}

exports.serv = comp;

const watchJs = function () {
    gulp.watch(srcDir + '/*.js', serv);
    gulp.watch(srcDir + '/views/*.js', views);
    gulp.watch(srcDir + '/views/components/*.js', comp);
    gulp.watch(srcDir + '/js/*.js', js);
}
const buildJs = gulp.parallel(js, views, comp, serv);
exports.buildJs = buildJs;

/*
 * Copy files e.q. templates, json, images
 */

function copyJson() {
    return gulp.src([srcDir + '/*.json'])
        .pipe(gulp.dest(distDir));
}

exports.copyJson = copyJson;

function copyIcons() {
    return gulp.src(srcDir + '/images/icons/*')
        .pipe(gulp.dest(distDir+'/images/icons'));
}

exports.copyIcons = copyIcons;

function copyTemplates() {
    return gulp.src(srcDir + '/templates/*')
        .pipe(gulp.dest(distDir+'/templates/'));
}

exports.copyTemplates = copyTemplates;

function copyComponents() {
    return gulp.src(srcDir + '/templates/components/*')
        .pipe(gulp.dest(distDir+'/templates/components'));

}

exports.copyComponents = copyComponents;

const watchCopy = function () {
    gulp.watch(srcDir + '/templates/*.tpl', copyTemplates);
    gulp.watch(srcDir + '/templates/components/*.tpl', views);
    gulp.watch(srcDir + '/*.json', copyJson);
}

/*
 * Build Instructions
 */
const gulpBuild = gulp.parallel(html, scss, css, js, views, comp, serv, copyJson, copyIcons, copyComponents, copyTemplates);
exports.build = gulpBuild;

/*
 * Watch instructions
 */

exports.default = function () {
    gulpBuild();
    watchJs();
    watchCopy();
    gulp.watch(srcDir + '/*.scss', scss);
    gulp.watch(srcDir + '/*.css', css);
    gulp.watch(srcDir + '/*.html', html);
}