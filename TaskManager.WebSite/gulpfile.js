/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

const gulp = require('gulp');
const del = require('del');
const gulpTypings = require("gulp-typings");
const sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');
const uglify = require('gulp-uglify');
const tscConfig = require('./tsconfig.json');
const concat = require('gulp-concat')

// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del('dist/**/*');
});


gulp.task('build', function () {

    var tsProject = typescript.createProject('./tsconfig.json', {
        typescript: require('typescript'),
        outFile: 'app.js'
    });

    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('dist'))

});

gulp.task('app-bundle', function () {

    var tsProject = typescript.createProject('./tsconfig.json', {
        typescript: require('typescript'),
        outFile: 'app.js'
    });

    var tsResult = gulp.src('app/**/*.ts')
                     .pipe(typescript(tsProject));

    return tsResult.js.pipe(concat('app.min.js'))
                  .pipe(uglify())
                  .pipe(gulp.dest('./dist'));
});
