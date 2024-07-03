const gulp = require('gulp');
const ejs = require('gulp-ejs');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

gulp.task('ejs', function() {
    return gulp.src('src/ejs/**/*.ejs')
        .pipe(ejs({}, {}, { ext: '.html' }))
        .pipe(rename({ extname: '.html' })) 
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src('src/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch('src/ejs/**/*.ejs', gulp.series('ejs'));
    gulp.watch('src/css/**/*.scss', gulp.series('sass'));
    gulp.watch('dist/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('ejs', 'sass', 'serve'));
