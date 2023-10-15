const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const gulpsourcemaps = require('gulp-sourcemaps');
const imageminify = require('gulp-imagemin');
const uglifier = require('gulp-uglify');
const obfuscater = require('gulp-obfuscate');


function compilarSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(gulpsourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulpsourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

function imageMin() {
    return gulp.src('./source/images/*')
        .pipe(imageminify())
        .pipe(gulp.dest('./build/images'))
}

function comprimeJS() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglifier())
        .pipe(obfuscater())
        .pipe(gulp.dest('./build/scripts'))
}

exports.default = function() {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilarSass));
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(imageMin));
    gulp.watch('./source/scripts/*js', { ignoreInitial: false }, gulp.series(comprimeJS));
}