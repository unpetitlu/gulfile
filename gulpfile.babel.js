'use strict';

import gulp from 'gulp';
import del  from 'del';
// don't stop watch when gulp throw error
import plumber from 'gulp-plumber';

// CSS
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css'; //minify
import sourcemaps from 'gulp-sourcemaps';

// JS
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

// Image
import imagemin from 'gulp-imagemin';

/*
import concat from 'gulp-concat';
ex : .pipe(concat('all.js'))
*/

/* CONFIGURATION */
const config = {
    assetsDir: 'app/assets',
    destDir: 'web/assets'
};
const sassPaths = {
    src: `${config.assetsDir}/css/**/*.scss`,
    dest: `${config.destDir}/css/`
};
const jsPaths = {
    src: `${config.assetsDir}/js/**/*.js`,
    dest: `${config.destDir}/js/`
};

const imgPaths = {
    src: `${config.assetsDir}/images/*`,
    dest: `${config.destDir}/images/`
};


/* TASKS */
gulp.task('clean', () => {
    return del([`${config.destDir}`]);
});

gulp.task('stylesheets', () => {
    return gulp.src(sassPaths.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(sassPaths.dest));
});

gulp.task('javascripts', () => {
    return gulp.src(jsPaths.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(jsPaths.dest));
});

gulp.task('img', () => {
    return gulp.src(imgPaths.src)
        .pipe(imagemin())
        .pipe(gulp.dest(imgPaths.dest));
});

gulp.task('default', ["watch"]);

gulp.task('prod', ["clean", "stylesheets", "javascripts", "img"]);

gulp.task('watch', function () {
    gulp.watch(sassPaths.src, ['stylesheets']);
    gulp.watch(jsPaths.src, ['javascripts']);
});
