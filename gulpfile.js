/**
 * Created by Amit Thakkar on 04/05/15.
 */
(function (require) {
    var gulp = require('gulp'),
        browserify = require('gulp-browserify'),
        uglify = require('gulp-uglify'),
        gulpif = require('gulp-if'),
        open = require("gulp-open"),
        runSequence = require('run-sequence');
    var isProduction = true;
    gulp.task('setDevEnvironment', function () {
        isProduction = false;
    });
    gulp.task('browserifyAMD', function () {
        return gulp.src(['app/browserifyAMD.js'])
            .pipe(browserify())
            .pipe(gulpif(isProduction, uglify()))
            .pipe(gulp.dest('build'));
    });
    gulp.task('browserifyHome', function () {
        return gulp.src(['app/home/home.controller.js'])
            .pipe(browserify())
            .pipe(gulpif(isProduction, uglify()))
            .pipe(gulp.dest('build/home'));
    });
    gulp.task('browserifyProduct', function () {
        return gulp.src(['app/product/product.controller.js'])
            .pipe(browserify())
            .pipe(gulpif(isProduction, uglify()))
            .pipe(gulp.dest('build/product'));
    });
    gulp.task('browserify', function (callback) {
        runSequence('browserifyAMD', 'browserifyHome', 'browserifyProduct', callback);
    });
    gulp.task('open', function () {
        var options = {
            url: 'http://localhost:63342/AngularAMD-with-Browserify/'
        };
        gulp.src('./index.html')
            .pipe(open("", options));
    });
    gulp.task('dev', function (callback) {
        runSequence('setDevEnvironment', 'browserify', 'open', callback);
    });
    gulp.task('default', ['browserify'])
})(require);