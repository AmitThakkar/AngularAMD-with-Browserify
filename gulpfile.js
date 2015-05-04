/**
 * Created by Amit Thakkar on 04/05/15.
 */
(function (require) {
    var gulp = require('gulp'),
        browserify = require('gulp-browserify'),
        uglify = require('gulp-uglify'),
        gulpif = require('gulp-if');
    var isProduction = true;
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
    gulp.task('browserify', ['browserifyAMD', 'browserifyHome', 'browserifyProduct']);
    gulp.task('setDevEnvironment', function () {
        isProduction = false;
    });
    gulp.task('dev', ['setDevEnvironment', 'browserify']);
    gulp.task('default', ['browserify'])
})(require);