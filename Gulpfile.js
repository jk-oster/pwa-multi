const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
// const imagemin = require('gulp-imagemin');
const minifyHTML = require('gulp-htmlmin');
const stripComments = require('gulp-strip-comments');
const jsHint = require('gulp-jshint');
const sass = require('gulp-sass')(require('sass'));

const distDir = 'dist';

// const terser = require('gulp-terser');

function lint(done) {
    gulp.src(['./src/js/*.js*', './src/views/*.js*', './src/views/components/*.js*', '!./js/*.min.js'])
        .pipe(jsHint({esnext: true}))
        .pipe(jsHint.reporter('default'));
    done();
}

exports.lint = lint;

// minify HTML pages

function html() {
    return gulp.src('./src/*.html')
        .pipe(stripComments())
        .pipe(minifyHTML({collapseWhitespace: true}))
        .pipe(gulp.dest(distDir));
}

exports.html = html;

function scss() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(distDir+'/css'));
}

exports.scss = scss;

function js() {
    return gulp.src(['src/js/*.js'])
        .pipe(stripComments())
        .pipe(uglify())
        .pipe(gulp.dest(distDir+'/js'));
}

exports.js = js;

function views() {
    return gulp.src(['src/views/*.js'])
        .pipe(stripComments())
        .pipe(uglify())
        .pipe(gulp.dest(distDir+'/views'));
}

exports.views = views;

function comp() {
    return gulp.src(['src/views/components/*.js'])
        .pipe(stripComments())
        .pipe(uglify())
        .pipe(gulp.dest(distDir+'/views/components'));
}

exports.comp = comp;

function serv() {
    return gulp.src(['src/*.js'])
        .pipe(stripComments())
        .pipe(uglify())
        .pipe(gulp.dest(distDir));
}

exports.serv = comp;

const watchJs = function () {
    gulp.watch('src/*.js', serv);
    gulp.watch('src/views/*.js', views);
    gulp.watch('src/views/components/*.js', comp);
    gulp.watch('src/js/*.js', js);
}
const buildJs = gulp.parallel(js, views, comp, serv);
exports.buildJs = buildJs;

function copyJson() {
    return gulp.src(['src/*.json'])
        .pipe(gulp.dest(distDir));
}

exports.copyJson = copyJson;

function copyIcons() {
    return gulp.src('src/images/icons/*')
        .pipe(gulp.dest(distDir+'/images/icons'));
}

exports.copyIcons = copyIcons;

function copyTemplates() {
    return gulp.src('src/templates/*')
        .pipe(gulp.dest(distDir+'/templates/'));
}

exports.copyTemplates = copyTemplates;

function copyComponents() {
    return gulp.src('src/templates/components/*')
        .pipe(gulp.dest(distDir+'/templates/components'));

}

exports.copyComponents = copyComponents;

const watchCopy = function () {
    gulp.watch('src/templates/*.tpl', copyTemplates);
    gulp.watch('src/templates/components/*.tpl', views);
    gulp.watch('src/*.json', copyJson);
}

// gulp.series(css)
const gulpBuild = gulp.parallel(html, scss, js, views, comp, serv, copyJson, copyIcons, copyComponents, copyTemplates);
exports.build = gulpBuild;

exports.default = function () {
    gulpBuild();
    watchJs();
    watchCopy();
    gulp.watch('src/*.scss', scss);
    gulp.watch('src/*.html', html);
}