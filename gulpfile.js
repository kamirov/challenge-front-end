// Gulp modules
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

var stylesDir = 'assets/css/';

gulp.task('styles', function() {
    gulp.src(stylesDir + '*.scss')
        .pipe(sass())
        .on('error', (err) => console.log(err) )
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});

gulp.task('default', ['styles'], function() {
    gulp.watch(stylesDir + '*.scss', ['styles']);
});