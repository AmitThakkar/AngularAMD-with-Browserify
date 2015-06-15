/**
 * Created by Amit Thakkar on 04/05/15.
 */
(function (require) {
    'use strict';
    var gulp = require('gulp'),
        browserify = require('gulp-browserify'),
        uglify = require('gulp-uglify'),
        gulpif = require('gulp-if'),
        open = require('gulp-open'),
        runSequence = require('run-sequence'),
        livereload = require('gulp-livereload'),
        notify = require('gulp-notify'),
        minifyHTML = require('gulp-minify-html'),
        inject = require('gulp-inject'),
        replace = require('gulp-replace'),
        concat = require('gulp-concat'),
        rimraf = require('rimraf'),
        gulpNgConfig = require('gulp-ng-config');

    var isProduction = true,
        projectName = 'AngularAMD with Browserify',
        sound = 'Frog',
        srcFolder = 'app/src/',
        destFolder = 'build/src/',
        temp = 'temp/',
        javascriptTasks = [
            {
                taskName: 'angular-amd',
                srcFiles: [srcFolder + 'angular-amd.js', temp + 'environment.config*.js'],
                dest: destFolder
            },
            {
                taskName: 'home.javascript',
                srcFiles: [srcFolder + 'components/home/home.controller.js'],
                dest: destFolder + 'components/home'
            },
            {
                taskName: 'product.javascript',
                srcFiles: [srcFolder + 'components/product/product.controller.js'],
                dest: destFolder + 'components/product'
            }
        ],
        htmlTasks = [
            {
                taskName: 'home.html',
                srcFiles: [srcFolder + 'components/home/_home.html'],
                dest: destFolder + 'components/home/'
            },
            {
                taskName: 'product.html',
                srcFiles: [srcFolder + 'components/product/_product.html'],
                dest: destFolder + 'components/product/'
            }
        ],
        now = '-' + Date.now(),
        getDestFileName = function (srcFile) {
            var fileParts = srcFile.match(/.*\/(.*)(\..*)/);
            return fileParts[1] + now + fileParts[2];
        };
    gulp.task('config.json', function () {
        return gulp.src(srcFolder + 'environment.config.json')
            .pipe(gulpNgConfig('angular-amd', {
                createModule: false,
                wrap: '(function(angular) {<%= module %>})(angular);',
                environment: 'production'
            }))
            .pipe(gulp.dest(temp));
    });
    gulp.task('index.html', function () {
        return gulp.src('./app/index.html')
            .pipe(inject(gulp.src(destFolder + 'angular-amd*.js', {read: false}), {relative: true}))
            .pipe(gulpif(isProduction, minifyHTML()))
            .pipe(gulp.dest('./build/'));
    });
    gulp.task('assets', function () {
        return gulp.src('app/assets/**/*')
            .pipe(gulp.dest('build/assets'));
    });
    gulp.task('clear', function (callback) {
        rimraf('./build', callback);
    });
    gulp.task('clear.temp', function (callback) {
        rimraf(temp, callback);
    });
    gulp.task('setDevEnvironment', function () {
        isProduction = false;
    });
    var taskNames = [];
    javascriptTasks.forEach(function (javascriptTask) {
        taskNames.push(javascriptTask.taskName);
        gulp.task(javascriptTask.taskName, function () {
            return gulp.src(javascriptTask.srcFiles)
                .pipe(concat(getDestFileName(javascriptTask.srcFiles[0])))
                .pipe(browserify())
                .pipe(replace('{{now}}', now))
                .pipe(gulpif(isProduction, uglify()))
                .pipe(gulp.dest(javascriptTask.dest))
                .pipe(gulpif(!isProduction, livereload()))
                .pipe(gulpif(!isProduction, notify({
                    title: projectName,
                    message: javascriptTask.taskName + ' task executed',
                    sound: sound
                })));
        });
    });
    htmlTasks.forEach(function (htmlTask) {
        taskNames.push(htmlTask.taskName);
        gulp.task(htmlTask.taskName, function () {
            return gulp.src(htmlTask.srcFiles)
                .pipe(concat(getDestFileName(htmlTask.srcFiles[0])))
                .pipe(gulpif(isProduction, minifyHTML()))
                .pipe(gulp.dest(htmlTask.dest))
                .pipe(gulpif(!isProduction, livereload()));
        })
    });
    gulp.task('browserify', function (callback) {
        runSequence('config.json', taskNames, 'index.html', 'assets', callback);
    });
    gulp.task('open', function () {
        var options = {
            url: 'http://localhost:63342/AngularAMD-with-Browserify/build/'
        };
        gulp.src('./build/index.html')
            .pipe(open('', options));
    });
    gulp.task('watch', function () {
        livereload.listen();
        gulp.watch(srcFolder + '*.js', ['angular-amd']);
        gulp.watch(srcFolder + 'shared/*.js', ['angular-amd']);
        gulp.watch(srcFolder + 'components/**/*.main.js', ['angular-amd']);
        gulp.watch(srcFolder + 'components/home/*.html', ['home.html']);
        gulp.watch(srcFolder + 'components/product/*.html', ['product.html']);
        gulp.watch(srcFolder + 'components/home/*.js', ['home.javascript']);
        gulp.watch(srcFolder + 'components/product/*.js', ['product.javascript']);
    });
    gulp.task('dev', function (callback) {
        runSequence('clear', 'setDevEnvironment', 'browserify', 'open', 'watch', 'clear.temp', callback);
    });
    gulp.task('default', function (callback) {
        runSequence('clear', 'browserify', 'clear.temp', callback);
    });
})(require);