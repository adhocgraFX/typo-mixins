// Include gulp
var gulp = require('gulp');

// Include our plugins
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var autoprefix = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

// hello world
gulp.task('hello', function() {
    console.log('Hello world!');
});

// LESS TO CSS
gulp.task('style', function () {
    return gulp.src([
            'styles/template.less'
        ])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefix('last 10 versions', 'ie 9', 'ie 8'))
        .pipe(minifyCSS())
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('map'))
        .pipe(gulp.dest('dist'))
        .pipe(notify({message:'style.css erfolgreich destilliert, hicks'}));
});

// WATCH
gulp.task('watch', function(){
    // chrome > livereload plugin required
    livereload.listen();

    // TEMPLATE FILES
    gulp.watch('styles/**/*.less',['style']).on('change', livereload.changed);
});

// CONNECT todo geht noch nicht
gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

// DEFAULT TASK
gulp.task('default', ['style', 'watch']);
