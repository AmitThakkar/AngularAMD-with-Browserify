/**
 * Created by Amit Thakkar on 04/05/15.
 */
(function (require) {
    'use strict';
    var gulp = require('gulp'),
        browserify = require('gulp-browserify'),
        uglify = require('gulp-uglify'),
        gulpif = require('gulp-if'),
        open = require("gulp-open"),
        runSequence = require('run-sequence'),
        livereload = require('gulp-livereload'),
        notify = require("gulp-notify"),
        minifyHTML = require('gulp-minify-html'),
        inject = require('gulp-inject'),
        rimraf = require('rimraf');

    var isProduction = true,
        projectName = "AngularAMD with Browserify",
        sound = "Frog",
        javascriptTasks = [
            {
                taskName: 'angular-amd',
                srcFile: 'app/angular-amd.js',
                dest: 'build'
            },
            {
                taskName: 'browserifyHome',
                srcFile: 'app/components/home/home.controller.js',
                dest: 'build/components/home'
            },
            {
                taskName: 'browserifyProduct',
                srcFile: 'app/components/product/product.controller.js',
                dest: 'build/components/product'
            }
        ],
        htmlTasks = [
            {
                taskName: 'home.html',
                srcFile: './app/components/home/_home.html',
                dest: 'build/components/home/'
            },
            {
                taskName: 'product.html',
                srcFile: './app/components/product/_product.html',
                dest: 'build/components/product/'
            }
        ];
    gulp.task('index.html', function () {
        return gulp.src('./app/index.html')
            .pipe(inject(gulp.src('./build/angular-amd*.js', {read: false}), {relative: true}))
            .pipe(gulpif(isProduction, minifyHTML()))
            .pipe(gulp.dest('./build/'));
    });
    gulp.task('clear', function (callback) {
        rimraf('./build', callback);
    });
    gulp.task('setDevEnvironment', function () {
        isProduction = false;
    });
    var taskNames = [];
    javascriptTasks.forEach(function (browserifyTask) {
        taskNames.push(browserifyTask.taskName);
        gulp.task(browserifyTask.taskName, function () {
            return gulp.src([browserifyTask.srcFile])
                .pipe(browserify())
                .pipe(gulpif(isProduction, uglify()))
                .pipe(gulp.dest(browserifyTask.dest))
                .pipe(gulpif(!isProduction, livereload()))
                .pipe(gulpif(!isProduction, notify({
                    title: projectName,
                    message: browserifyTask.taskName + ' task executed',
                    sound: sound
                })));
        });
    });
    htmlTasks.forEach(function (htmlTask) {
        taskNames.push(htmlTask.taskName);
        gulp.task(htmlTask.taskName, function () {
            return gulp.src(htmlTask.srcFile)
                .pipe(gulpif(isProduction, minifyHTML()))
                .pipe(gulpif(!isProduction, livereload()))
                .pipe(gulp.dest(htmlTask.dest));
        })
    });
    gulp.task('browserify', function (callback) {
        runSequence(taskNames, 'index.html', callback);
    });
    gulp.task('open', function () {
        var options = {
            url: 'http://localhost:63342/AngularAMD-with-Browserify/build/'
        };
        gulp.src('./build/index.html')
            .pipe(open("", options));
    });
    gulp.task('watch', function () {
        livereload.listen();
        gulp.watch('app/*.js', ['angular-amd']);
        gulp.watch('app/shared/*.js', ['angular-amd']);
        gulp.watch('app/components/**/*.main.js', ['angular-amd']);
        gulp.watch('app/components/home/*.html', ['home.html']);
        gulp.watch('app/components/product/*.html', ['product.html']);
        gulp.watch('app/components/home/*.js', ['browserifyHome']);
        gulp.watch('app/components/product/*.js', ['browserifyProduct']);
    });
    gulp.task('dev', function (callback) {
        runSequence('clear', 'setDevEnvironment', 'browserify', 'open', 'watch', callback);
    });
    gulp.task('default', function (callback) {
        runSequence('clear', 'browserify', callback);
    });
})(require);