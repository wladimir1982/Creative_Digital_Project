var $ = require('gulp-load-plugins')();
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');
var wiredep = require('wiredep')({
    directory: './assets/components',
    exclude: [/jquery/, /less/]
});
var PATHS = wiredep;

gulp.task('javascript', function () {
    return gulp.src(['./assets/src/js/plugins/*.js', './assets/src/js/scripts.js'])
        .pipe(concat('global.js'))
        .pipe(gulp.dest('./assets/dist/'));
});

gulp.task('sass', function () {
    gulp.src('./assets/src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe($.sass({
            includePaths: PATHS.scss
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass({includePaths: ['scss']}).on('error', function (error) {
                console.log(error);
            })
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/dist'));
});

gulp.task('browser-sync', function () {
    browserSync.init(["./assets/dist/style.css"], {
        server: {
            baseDir: "./",
            serveStaticOptions: {
                extensions: ["html"]
            }
        }
    });
});

gulp.task('default', ['sass', 'javascript', 'browser-sync'], function () {
    gulp.watch("./assets/src/scss/**/*.scss", ['sass']);
    gulp.watch("./assets/src/js/scripts.js", ['javascript']);
});
