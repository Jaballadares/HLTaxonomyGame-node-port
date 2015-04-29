var gulp = require('gulp'),
    connect = require('gulp-connect');

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

gulp.task('js', function() {
    gulp.src('./js/*.js')
        .pipe(connect.reload());
});

gulp.task('default', ['webserver', 'watch', 'js']);
