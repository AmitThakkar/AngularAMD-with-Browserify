/**
 * Created by Amit Thakkar on 04/05/15.
 */
(function (require) {
    var gulp = require('gulp'),
        browserify = require('gulp-browserify'),
        uglify = require('gulp-uglify'),
        gulpif = require('gulp-if'),
        open = require("gulp-open"),
        runSequence = require('run-sequence'),
        livereload = require('gulp-livereload'),
        notify = require("gulp-notify"),
        rimraf = require('rimraf');

    var isProduction = true,
        projectName = "AngularAMD with Browserify",
        sound = "Frog";

    gulp.task('clear', function (callback) {
        rimraf('./build', callback);
    });
    gulp.task('setDevEnvironment', function () {
        isProduction = false;
    });
    gulp.task('browserifyAMD', function () {
        return gulp.src(['app/browserifyAMD.js'])
            .pipe(browserify())
            .pipe(gulpif(isProduction, uglify()))
            .pipe(gulp.dest('build'))
            .pipe(livereload())
            .pipe(notify({
                title: projectName,
                message: 'browserifyAMD task executed',
                sound: sound
            }));
    });
    gulp.task('browserifyHome', function () {
        return gulp.src(['app/home/home.controller.js'])
            .pipe(browserify())
            .pipe(gulpif(isProduction, uglify()))
            .pipe(gulp.dest('build/home'))
            .pipe(livereload())
            .pipe(notify({
                title: projectName,
                message: 'browserifyHome task executed',
                sound: sound
            }));
    });
    gulp.task('browserifyProduct', function () {
        return gulp.src(['app/product/product.controller.js'])
            .pipe(browserify())
            .pipe(gulpif(isProduction, uglify()))
            .pipe(gulp.dest('build/product'))
            .pipe(livereload())
            .pipe(notify({
                title: projectName,
                message: 'browserifyProduct task executed',
                sound: sound
            }));
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
    gulp.task('watch', function () {
        livereload.listen();
        gulp.watch('app/*.js', ['browserifyAMD']);
        gulp.watch('app/home/*.js', ['browserifyHome']);
        gulp.watch('app/product/*.js', ['browserifyProduct']);
    });
    gulp.task('dev', function (callback) {
        runSequence('clear', 'setDevEnvironment', 'browserify', 'open', 'watch', callback);
    });
    gulp.task('default', function (callback) {
        runSequence('clear', 'browserify', callback);
    });
})(require);