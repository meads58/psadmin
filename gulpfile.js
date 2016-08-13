"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');//run a local dev server
var open = require('gulp-open');//Open an URL in browser
var browserify = require('browserify'); //Bundle JS
var reactify = require('reactify');//Transform React JSX to JS
var source = require('vinyl-source-stream');//Use conventional text streams with gulp.
var concat = require('gulp-concat'); //concatenates files
var lint = require('gulp-eslint');//will lint our JS file including JSX

var config = {
    port: 9008,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [
          'node_modules/bootstrap/dist/css/bootstrap.min.css',
          'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        dist: './dist',
        mainJs: './src/main.js'
    }
}

//Start a local dev server
gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });


});

//gulp.src takes an array of source paths. Open then opens this path
gulp.task('open', ['connect'], function() {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

//get any html files and put them in the dist dir and reload the dev server.
gulp.task('html', function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function() {
        browserify(config.paths.mainJs)//pass broswerfy the path
            .transform(reactify)//use brosweify transform to compile the JS
            .bundle()//put everything into one file
            .on('error', console.error.bind(console))//if any errors spit out on the condole
            .pipe(source('bundle.js'))//define what our bundle will be named
            .pipe(gulp.dest(config.paths.dist + '/scripts'))//destination fo the bundle we just defined and put it in scripts
            .pipe(connect.reload());//as we change any JS we want to know we are seeing the lastest version
});

gulp.task('css', function() {
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('lint', function() {
    return gulp.src(config.paths.js)
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});

//watches the html files and and runs the html task if anything changes. 
gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'css', 'lint', 'open', 'watch']);