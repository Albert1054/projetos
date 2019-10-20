let gulp = require('gulp');
let browserSync = require('browser-sync');
let sass = require('gulp-sass');

//Compiler Sass
gulp.task('sass', gulp.series(function(){

    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());

}));

//move JS para src/js
gulp.task('js', gulp.series(function(){

    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());

}));

//server para HTML/SCSS
gulp.task('serve', gulp.series(('sass'), function(){

    browserSync.init({
        server: "./src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.parallel(['sass']));
    gulp.watch("src/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series(['js', 'serve']));