/*= ========== Init Plugins ============== */
const projectName = 'taukir-quickstart';
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const prefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const imageminPngQuant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const htmlhint = require('gulp-htmlhint');
const concat = require('gulp-concat');
const zip = require('gulp-zip');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

// Put CSS that you want to replace with all.min.css
const replaceCSS = `<!-- ======= FontAwesome ======= -->
    <link rel="stylesheet" href="assets/css/all.min.css" />

    <!-- ======= Main Stylesheet ======= -->
    <link rel="stylesheet" href="assets/css/style.css" />

    <!-- ======= Custom Stylesheet ======= -->
    <link rel="stylesheet" href="assets/css/custom.css" />`;

// Put JS that you want to replace with all.min.js
const replaceJS = `<!-- ======= jQuery Library ======= -->
    <script src=" assets/js/jquery.min.js"></script>

    <!-- ======= Main JS ======= -->
    <script src="assets/js/main.js"></script>

    <!-- ======= Custom JS ======= -->
    <script src="assets/js/custom.js"></script>`;

/** ******************************************* */
/* 01: Default
============================================== */

/*= ========== SASS ============== */
gulp.task('sass', function (cb) {
    gulp.src('./HTML/assets/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(
            sass({
                outputStyle: 'expanded',
            }).on('error', sass.logError)
        )
        .pipe(
            prefixer({
                overrideBrowserslist: ['last 5 versions'],
                cascade: false,
            })
        )
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./HTML/assets/css'));
    cb();
});

/*= ========== Watch ============== */
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: './HTML/',
            index: 'index.html',
        },
        port: 6416,
        notify: false,
    });

    gulp.watch(
        ['./HTML/**/*.html', './HTML/**/*.scss', './HTML/**/*.js'],
        gulp.series('sass')
    ).on('change', browserSync.reload);
});

/** ******************************************* */
/* 02: Build
============================================== */

/*= ========== Minimization Image ============== */
gulp.task('images', function (cb) {
    gulp.src('./HTML/assets/img/**/*.+(jpg|jpeg|gif|png)')
        .pipe(
            imagemin(
                [
                    imagemin.gifsicle({interlaced: true}),
                    imagemin.mozjpeg({quality: 75, progressive: true}),
                    imagemin.optipng({optimizationLevel: 5}),
                    imageminPngQuant(),
                    imageminJpegRecompress(),
                ],
                {
                    verbose: true,
                }
            )
        )
        .pipe(gulp.dest('./HTML/assets/img'));
    cb();
});

/*= ========== HTML Valid ============== */
gulp.task('html-valid', function (cb) {
    gulp.src('HTML/*.html')
        .pipe(htmlhint({'attr-lowercase': ['viewBox']}))
        .pipe(htmlhint.failAfterError());
    cb();
});

/** ******************************************* */
/* 03: Generate TF Package
============================================== */

/*= ========== Delete Previous ============== */
gulp.task('clean', function (cb) {
    del.sync(['./HTML-tf', './HTML-preview']);
    cb();
});

/*= ========== Copy Files ============== */
gulp.task('copy-files', function (cb) {
    gulp.src(['HTML/**', 'Documentetion/**'], {
        base: './',
    }).pipe(gulp.dest('HTML-tf'));

    gulp.src('HTML/**').pipe(gulp.dest('HTML-preview'));

    cb();
});

/*= ========== Compile JS to ES5 ============== */
gulp.task('toES5', function (cb) {
    gulp.src('HTML-tf/HTML/assets/js/main.js')
        .pipe(
            babel({
                presets: ['@babel/env'],
            })
        )
        .pipe(gulp.dest('HTML-tf/HTML/assets/js'));

    cb();
});

/*= ========== Copy Placeholder Images ============== */
gulp.task('placeholder', function (cb) {
    gulp.src('Placeholder/**/*').pipe(gulp.dest('HTML-tf/HTML/assets/img'));

    cb();
});

/*= ========== Preview TF Files ============== */
gulp.task('previewTf', function (cb) {
    browserSync.init({
        server: {
            baseDir: './HTML-tf/HTML/',
            index: 'index.html',
        },
        port: 6419,
        notify: false,
    });

    cb();
});

/** ******************************************* */
/* 04: Minify
============================================== */

/*= ========== Compile JS to ES5 ============== */
gulp.task('previewES5', function (cb) {
    gulp.src('HTML-preview/assets/js/main.js')
        .pipe(
            babel({
                presets: ['@babel/env'],
            })
        )
        .pipe(gulp.dest('HTML-preview/assets/js'));

    cb();
});

/*= ========== Minify ============== */
gulp.task('minify', function (cb) {
    // Generate all.min.css
    gulp.src([
        './HTML/assets/css/all.min.css',
        './HTML-preview/assets/plugins/**/*.css',
        './HTML/assets/css/style.css',
    ])
        .pipe(concat('all.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./HTML-preview/assets/css'));

    // Generate all.min.js
    gulp.src([
        './HTML-preview/assets/js/jquery.min.js',
        './HTML-preview/assets/plugins/**/*.js',
        './HTML-preview/assets/js/main.js',
    ])
        .pipe(
            concat('all.min.js', {
                newLine: '\n;',
            })
        )
        .pipe(uglify())
        .pipe(gulp.dest('./HTML-preview/assets/js'));

    // Copy additonal plugins files
    gulp.src('./HTML-preview/assets/plugins/**/*.+(jpg|jpeg|gif|png|svg")')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./HTML-preview/assets/css'));

    // Minify HTML
    gulp.src('./HTML-preview/*.html')
        .pipe(
            replace(
                replaceCSS,
                `<link rel="stylesheet" href="assets/css/all.min.css" />`
            )
        )
        .pipe(
            replace(replaceJS, `<script src="assets/js/all.min.js"></script>`)
        )
        .pipe(
            htmlmin({
                collapseWhitespace: true,
                removeComments: true,
                minifyJS: true,
            })
        )
        .pipe(gulp.dest('./HTML-preview/'));

    browserSync.init({
        server: {
            baseDir: './HTML-preview/',
            index: 'index.html',
        },
        port: 6420,
        notify: false,
    });

    cb();
});

/** ******************************************* */
/* 05: Zip
============================================== */

/*= ========== Delete Previous ZIP ============== */
gulp.task('clean-zip', function (cb) {
    del.sync(['./html-tf*.zip', './html-preview.zip']);
    cb();
});

/*= ========== Generate ZIP ============== */
gulp.task('zip', function (cb) {
    gulp.src('HTML-preview/**')
        .pipe(zip('html-preview.zip'))
        .pipe(gulp.dest('./'));

    gulp.src('HTML-tf/**').pipe(zip('html-tf.zip')).pipe(gulp.dest('./'));

    cb();
});

/** ******************************************* */
/* 05: Wrap
============================================== */

/*= ========== Delete Previous ZIP ============== */
gulp.task('clean-wrap-zip', function (cb) {
    del.sync([`./${projectName}.zip`]);
    cb();
});

/*= ========== Wrap Up ============== */
gulp.task('wrap', function (cb) {
    gulp.src('./**/*.zip')
        .pipe(rename({dirname: ''}))
        .pipe(zip(`${projectName}.zip`))
        .pipe(gulp.dest('./'));
    cb();
});

/** ******************************************* */
/** ******************************************* */
/* Tasks
/********************************************* */
/** ******************************************* */

/*= ========== Default ============== */
gulp.task('default', gulp.parallel('sass', 'watch'));

/*= ========== Build ============== */
gulp.task('build', gulp.series('sass', 'html-valid', 'images'));

/*= ========== Generate Files ============== */
gulp.task('generate', gulp.series('clean', 'copy-files'));

/*= ========== TF ============== */
gulp.task('tf', gulp.series('placeholder', 'toES5', 'previewTf'));

/*= ========== Minify ============== */
gulp.task('minify', gulp.series('previewES5', 'minify'));

/*= ========== Generate Zip ============== */
gulp.task('zip', gulp.series('clean-zip', 'zip'));

/*= ========== Wrap Project ============== */
gulp.task('wrap', gulp.series('clean-wrap-zip', 'wrap'));

/*= ========== Clean All ============== */
gulp.task('all-clear', function (cb) {
    del.sync(['./HTML-tf', './HTML-preview']);
    cb();
});

gulp.task('distroy', gulp.series('all-clear', 'clean-zip', 'clean-wrap-zip'));
