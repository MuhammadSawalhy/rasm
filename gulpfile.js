//  dest = '.dist';
//  mapsDest = './dist/maps';

//#region /// instantiating variables..........
var mapsIncludeContent = true;

const gulp = require('gulp'),
   // sass = require('gulp-sass'),
   // autoprefixer = require('gulp-autoprefixer'),
   // minify = require('gulp-minify'),
   // notify = require('gulp-notify'),
   concat = require('gulp-concat'),
   sourcemaps = require('gulp-sourcemaps'),
   browserSync = require('browser-sync').create();

//#endregion

//#region pugjs
function pugCompile(source, dest, options = {}) {
   const pug = require('gulp-pug');
   //#region preparations
   if (typeof (source) === 'string') {
      source = gulp.src(source);
   }
   let defaultOptions = {
      fileName: 'all',
      outputStyle: 'expanded'
   };
   options = { ...defaultOptions, ...options };
   let { fileName, outputStyle } = options;
   if (!Array.isArray(outputStyle)) {
      outputStyle = [outputStyle];
   }
   let last;
   for (let outStyle of outputStyle) {
      let ext = (outStyle !== 'expanded' ?
         (outStyle === 'compressed' ? '.min' : '.' + outStyle) :
         '');
      let filename = fileName + ext + '.html';

      last = source
         .pipe(sourcemaps.init({ largeFile: true, loadMaps: false }))
         .pipe(pug())
         .pipe(sourcemaps.write('.', { includeContent: mapsIncludeContent }))
         .pipe(gulp.dest(dest));
   }
   return last;
   //#endregion
}
function pugDoAll() {
   return pugCompile('./src/pugjs/index.pug', './dist', { outputStyle: ['compressed'] });
}
gulp.task('pug', pugDoAll);
//#endregion

//#region /// for compiling sass files.
function stylesCompileAll(source, dest, options = {}) {
   let sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer');

   //#region preparations
   if (typeof (source) === 'string') {
      source = gulp.src(source);
   }
   let defaultOptions = {
      fileName: 'style',
      outputStyle: 'expanded'
   };
   options = { ...defaultOptions, ...options };
   let { fileName, outputStyle } = options;
   if (!Array.isArray(outputStyle)) {
      outputStyle = [outputStyle];
   }

   //#endregion
   let last;
   for (let outStyle of outputStyle) {
      let ext = (outStyle !== 'expanded' ?
         (outStyle === 'compressed' ? '.min' : '.' + outStyle) :
         '');
      let filename = fileName + ext + '.css';

      last = source
         .pipe(sourcemaps.init({ largeFile: true, loadMaps: false }))
         .pipe(sass({ outputStyle: outStyle }))
         .pipe(autoprefixer('last 2 versions'))
         .pipe(concat(filename))
         .pipe(sourcemaps.write('.', { includeContent: mapsIncludeContent }))
         .pipe(gulp.dest(dest))
         .pipe(browserSync.stream());
   }
   return last;
}
function stylesDoAll() {
   return stylesCompileAll('./src/styles/style.scss', './dist/styles', { outputStyle: ['compressed'] });
}
gulp.task('sass', stylesDoAll);
//#endregion

//#region /// for js files.
function jsCompile(source, dest = './dist/js', options = {}) {

   //#region preparations
   if (typeof (source) === 'string') {
      source = gulp.src(source);
   }
   const defaultOptions = {
      fileName: 'all',
      outputStyle: 'expanded'
   };
   options = { ...defaultOptions, ...options };
   let { fileName, outputStyle } = options;
   if (!Array.isArray(outputStyle)) {
      outputStyle = [outputStyle];
   }
   const minify = require('gulp-minify');
   //#endregion

   const babel = require('gulp-babel');
   let babelOptions = {
      presets: ['@babel/env']
   };
   const terser = require('gulp-terser');

   let last;
   for (let outStyle of outputStyle) {

      if (outStyle === 'compressed') {
         let filename = fileName + '.js';
         let minifierOptions = {
            ext: {
               src: '.js',
               min: '.min.js'
            },
            //exclude: [],
            ignoreFiles: ['.min.js']
         };

         source
            .pipe(sourcemaps.init())

            // .pipe(babel(babelOptions))
            .pipe(concat(filename))
            .pipe(minify(minifierOptions))

            .pipe(sourcemaps.write('.', { includeContent: mapsIncludeContent }))
            .pipe(gulp.dest(dest));
      } else if (outStyle === 'expanded') {
         let filename = fileName + '.js';

         last = source
            .pipe(sourcemaps.init())

            // .pipe(babel(babelOptions))
            .pipe(terser())

            .pipe(sourcemaps.write('.', { includeContent: mapsIncludeContent }))
            .pipe(gulp.dest(dest));
      }

   }
   return last;
}
function jsDoApp() {
   // for app
   return jsCompile('./src/js/app.js', './dist/js', { fileName: 'app', outputStyle: ['compressed'] });
}
function jsDoAll() {
   return jsDoApp();
}
gulp.task('js', jsDoAll);
// gulp.task('app', jsDoApp);
//#endregion

//#region final touches

// compile, concat then dist all project
gulp.task('all', () => {
   stylesDoAll();
   pugDoAll();
   return jsDoAll();
});

let watchMyProject = function () {

   gulp.watch([
      './dist/**/*.html',
      './dist/**/*.js'
   ], browserSync.relode);

   gulp.watch(['./src/pugjs/**/*.pug'], pugDoAll);

   // gulp.watch(['./src/js/**/*.js'], jsDoAll);

   return gulp.watch(['./src/styles/**/*.scss'], stylesDoAll);
};

gulp.task('watch', watchMyProject);

let serveMyProject = function () {
   browserSync.init({
      server: {
         baseDir: "./dist/",
      }
   });

   return watchMyProject();
};

gulp.task('server', serveMyProject);

//#endregion

gulp.task('default', serveMyProject);