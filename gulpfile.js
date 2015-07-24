var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        root: [__dirname]
    });
});

gulp.task('watch', function() {
    gulp.watch('./css/*.css', ['css']);
    gulp.watch('./*.html', ['html']);
    gulp.watch('./js/*.js', ['js']);
});

gulp.task('html', function() {
    gulp.src('./*.html')
        .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src('./css/*.css')
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src('./scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});

gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('js', function() {
    gulp.src('./js/*.js')
        .pipe(connect.reload());
});

gulp.task('default', ['webserver', 'watch', 'js', 'sass', 'sass:watch']);
