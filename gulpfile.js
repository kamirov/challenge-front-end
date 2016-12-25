// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

var stylesDir = 'assets/css/';

gulp.task('styles', function() {
    gulp.src(stylesDir + '*.scss')
        .pipe(sass())
        .on('error', (err) => console.log(err) )
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});

gulp.task('default', ['styles'], function() {
    gulp.watch(stylesDir + '*.scss', ['styles']);
});