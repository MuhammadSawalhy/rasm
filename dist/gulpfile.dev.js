"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//  dest = '.dist';
//  mapsDest = './dist/maps';
//#region /// instantiating variables..........
var mapsIncludeContent = true;

var gulp = require('gulp'),
    // sass = require('gulp-sass'),
// autoprefixer = require('gulp-autoprefixer'),
// minify = require('gulp-minify'),
// notify = require('gulp-notify'),
// concat = require('gulp-concat'),
sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(); //#endregion
//#region pugjs


function pugCompile(source, dest) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var pug = require('gulp-pug'); //#region preparations


  if (typeof source === 'string') {
    source = gulp.src(source);
  }

  var defaultOptions = {
    fileName: 'all',
    outputStyle: 'expanded'
  };
  options = _objectSpread({}, defaultOptions, {}, options);
  var _options = options,
      fileName = _options.fileName,
      outputStyle = _options.outputStyle;

  if (!Array.isArray(outputStyle)) {
    outputStyle = [outputStyle];
  }

  var last;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = outputStyle[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var outStyle = _step.value;
      var ext = outStyle !== 'expanded' ? outStyle === 'compressed' ? '.min' : '.' + outStyle : '';
      var filename = fileName + ext + '.html';
      last = source.pipe(sourcemaps.init({
        largeFile: true,
        loadMaps: false
      })).pipe(pug()).pipe(sourcemaps.write('.', {
        includeContent: mapsIncludeContent
      })).pipe(gulp.dest(dest));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return last; //#endregion
}

function pugDoAll() {
  return pugCompile('./src/pugjs/index.pug', './dist', {
    outputStyle: ['compressed']
  });
}

gulp.task('pug', pugDoAll); //#endregion
//#region /// for compiling sass files.

function stylesCompileAll(source, dest) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'); //#region preparations


  if (typeof source === 'string') {
    source = gulp.src(source);
  }

  var defaultOptions = {
    fileName: 'all',
    outputStyle: 'expanded'
  };
  options = _objectSpread({}, defaultOptions, {}, options);
  var _options2 = options,
      fileName = _options2.fileName,
      outputStyle = _options2.outputStyle;

  if (!Array.isArray(outputStyle)) {
    outputStyle = [outputStyle];
  } //#endregion


  var last;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = outputStyle[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var outStyle = _step2.value;
      var ext = outStyle !== 'expanded' ? outStyle === 'compressed' ? '.min' : '.' + outStyle : '';
      var filename = fileName + ext + '.css';
      last = source.pipe(sourcemaps.init({
        largeFile: true,
        loadMaps: false
      })).pipe(sass({
        outputStyle: outStyle
      })).pipe(concat(filename)).pipe(autoprefixer('last 2 versions')).pipe(sourcemaps.write('.', {
        includeContent: mapsIncludeContent
      })).pipe(gulp.dest(dest)).pipe(browserSync.stream());
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return last;
}

function stylesDoAll() {
  return stylesCompileAll('./src/styles/style.scss', './dist/styles', {
    outputStyle: ['compressed']
  });
}

gulp.task('sass', stylesDoAll); //#endregion
//#region /// for js files.

function jsCompile(source) {
  var dest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : './dist/js';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  //#region preparations
  if (typeof source === 'string') {
    source = gulp.src(source);
  }

  var defaultOptions = {
    fileName: 'all',
    outputStyle: 'expanded'
  };
  options = _objectSpread({}, defaultOptions, {}, options);
  var _options3 = options,
      fileName = _options3.fileName,
      outputStyle = _options3.outputStyle;

  if (!Array.isArray(outputStyle)) {
    outputStyle = [outputStyle];
  }

  var minify = require('gulp-minify'); //#endregion


  var babel = require('gulp-babel');

  var babelOptions = {
    presets: ['@babel/env']
  };

  var terser = require('gulp-terser');

  var last;
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = outputStyle[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var outStyle = _step3.value;

      if (outStyle === 'compressed') {
        var filename = fileName + '.js';
        var minifierOptions = {
          ext: {
            src: '.js',
            min: '.min.js'
          },
          //exclude: [],
          ignoreFiles: ['.min.js']
        };
        source.pipe(sourcemaps.init()) // .pipe(babel(babelOptions))
        .pipe(concat(filename)).pipe(minify(minifierOptions)).pipe(sourcemaps.write('.', {
          includeContent: mapsIncludeContent
        })).pipe(gulp.dest(dest));
      } else if (outStyle === 'expanded') {
        var _filename = fileName + '.js';

        last = source.pipe(sourcemaps.init()) // .pipe(babel(babelOptions))
        .pipe(terser()).pipe(sourcemaps.write('.', {
          includeContent: mapsIncludeContent
        })).pipe(gulp.dest(dest));
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return last;
}

function jsDoApp() {
  // for app
  return jsCompile('./src/js/app.js', './dist/js', {
    fileName: 'app',
    outputStyle: ['compressed']
  });
}

function jsDoAll() {
  return jsDoApp();
}

gulp.task('js', jsDoAll); // gulp.task('app', jsDoApp);
//#endregion
//#region final touches
// compile, concat then dist all project

gulp.task('all', function () {
  stylesDoAll();
  pugDoAll();
  return jsDoAll();
});

var watchMyProject = function watchMyProject() {
  gulp.watch(['./dist/**/*.html', './dist/**/*.js'], browserSync.relode);
  gulp.watch(['./src/pugjs/**/*.pug'], pugDoAll);
  gulp.watch(['./src/js/**/*.js'], jsDoAll);
  return gulp.watch(['./src/styles/**/*.scss'], stylesDoAll);
};

gulp.task('watch', watchMyProject);

var serveMyProject = function serveMyProject() {
  browserSync.init({
    server: {
      baseDir: "."
    }
  });
  return watchMyProject();
};

gulp.task('live-server', serveMyProject); //#endregion

gulp.task('default', serveMyProject);