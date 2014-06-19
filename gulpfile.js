/**
 * @file gulpfile.js
 * @brief Builds the TartanCrew website using Gulp
 * @author Oscar Bezi (bezi@cmu.edu)
 * @since 17 July 2014
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var merge = require('merge-stream');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var filesize = require('gulp-filesize');
var fs = require('fs');

var jade = require('gulp-jade');

var uglify = require('gulp-uglify');

var scss = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');

// set to false to compile for release
// minifies jade, js, css files
var dev = false;

// cleans compiled files
gulp.task('clean', function() {
    var html = gulp.src('./*.html', {read: false})
        .pipe(clean());
    var css = gulp.src('./assets/css/*.css', {read: false})
        .pipe(clean());
    var js = gulp.src('./assets/js/*.js', {read: false})
        .pipe(clean());
    return merge(html, css, js);
});

// builds the HTML files
gulp.task('html', function() {
    // make configuration object based on whether we're in dev mode
    var jade_opts = {
        pretty: dev,
        compileDebug: dev
    };
    jade_opts.locals = JSON.parse(fs.readFileSync('./src/jade/data/data.json'));
    return gulp.src('./src/jade/*.jade')
        .pipe(jade(jade_opts))
        .pipe(gulp.dest('./'))
        .pipe(filesize())
        .on('error', gutil.log);
});

// builds the JS files
// minifies and concatenates vendor libraries
gulp.task('js-vendor', function() {
    return gulp.src('./src/js/vendor/*.js')
        .pipe(concat('vendor.js')) // concatenate all the libraries
        .pipe(filesize()) // print its size
        .pipe(uglify()) // minify file
        .pipe(rename('vendor.min.js')) 
        .pipe(filesize()) 
        .pipe(gulp.dest('./assets/js')) // output minified file
        .on('error', gutil.log); // error handling
});

gulp.task('js', function() {
    // only minify if we're not developing
    if (dev) {
        return gulp.src('./src/js/*.js')
            .pipe(gulp.dest('assets/js/')) 
            .pipe(filesize());
    } else {
        return gulp.src('./src/js/*.js')
            .pipe(uglify())
            .pipe(rename(function(path) {
                path.extname = ".min.js"
            }))
            .pipe(gulp.dest('assets/js/'))
            .pipe(filesize()) 
            .on('error', gutil.log);
    }
});

// builds the CSS files and minifies them
// minifies and concatenates vendor libraries
gulp.task('css-vendor', function() {
    return gulp.src('./src/scss/vendor/*.css')
            .pipe(concat('vendor.css'))
            .pipe(minifyCSS())
            .pipe(filesize())
            .pipe(gulp.dest('./assets/css'))
            .on('error', gutil.log);
});

gulp.task('css', function() {
    if (dev) {
        return gulp.src('./src/scss/*.scss')
            .pipe(scss())
            .pipe(gulp.dest('./assets/css/'))
            .pipe(filesize())
            .on('error', gutil.log);
    } else {
        return gulp.src('src/scss/*.scss')
            .pipe(scss())
            .pipe(minifyCSS())
            .pipe(gulp.dest('assets/css/'))
            .pipe(filesize())
            .on('error', gutil.log);
    }
});

gulp.task('default', ['html', 'js', 'css']);
