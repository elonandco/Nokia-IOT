var gulp = require('gulp');
var ts = require('gulp-typescript');
var gnf = require('gulp-npm-files');
var del = require('del');
var clean = require('gulp-clean');
var zip = require('gulp-zip');
var merge = require('merge-stream');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');

var fs = require('fs');
var path = require('path');

var project = JSON.parse(fs.readFileSync('./package.json'));
// Paths
var DEV_PATH = 'build';
var PROD_PATH = 'prod';
var TEMP_PATH = 'temp';
var SRC_PATH = 'src';
var DIST_PATH = 'dist';

gulp.task('default', ['compile:src', 'copy:html', 'copy:libs', 'copy:css-libs', 'copy:config', 'copy:assets', 'process:styles', 'copy:system:conf'], function () {

});

gulp.task('dist', ['zip']);

gulp.task('compile:src', ['clean'], function () {
  return gulp.src('src/**/*.ts')
             .pipe(ts({
               "target": "es5",
               "module": "system",
               "moduleResolution": "node",
               "sourceMap": true,
               "emitDecoratorMetadata": true,
               "experimentalDecorators": true,
               "removeComments": false,
               "noImplicitAny": false
             }))
             .pipe(gulp.dest(DEV_PATH + '/src'));
});

gulp.task('copy:html', ['clean'], function () {
  return gulp.src([path.join('**', '*.html'), '!' + path.join('node_modules', '**', '*.html')])
             .pipe(gulp.dest(DEV_PATH));
});

gulp.task('process:styles', ['clean'], function () {
  return gulp.src(path.join(SRC_PATH, '**/*.scss'))
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest(path.join(DEV_PATH, 'styles')));
});

gulp.task('copy:libs', ['clean'], function () {
  return gulp.src(gnf(null, './package.json'), {base: './'})
             .pipe(gulp.dest(DEV_PATH));
});

gulp.task('copy:css-libs', ['clean'], function () {
  return gulp.src('libs/**/*.*')
             .pipe(gulp.dest(DEV_PATH + '/libs'));
});

gulp.task('copy:assets', ['clean'], function () {
  return gulp.src(['src/**/assets/**/*.*'])
             .pipe(gulp.dest(DEV_PATH + '/src'));
});

gulp.task('copy:config', ['clean'], function () {
  return gulp.src('src/custom/config.json')
             .pipe(gulp.dest(DEV_PATH + '/src/custom'));
});

gulp.task('copy:system:conf', ['clean'], function () {
  return gulp.src('systemjs.config.js').pipe(gulp.dest(DEV_PATH));
});

gulp.task('clean', function () {
  return del([DEV_PATH + '/**/*']);
});

gulp.task('zip', ['compile:src', 'copy:html', 'copy:libs', 'copy:css-libs', 'copy:config', 'copy:assets', 'process:styles', 'copy:system:conf'], function () {
  var date = new Date().toISOString().replace(/[^0-9]/g, '');
  return gulp.src(path.join(DEV_PATH, '/**/*'), {base: DEV_PATH})
             .pipe(zip(project.name + '_' + project.version + '_' + date + '.zip'))
             .pipe(gulp.dest('dist'));
});

/*
 * Production Build Tasks
 */

gulp.task('build:prod', ['package:prod'], function () {

});

gulp.task('package:prod', ['build:js:prod', 'build:styles:prod', 'build:assets:prod', 'build:html:prod'], function () {
  var date = new Date().toISOString().replace(/[^0-9]/g, '');
  return gulp.src(path.join(TEMP_PATH, '/**/*'), {base: TEMP_PATH})
             .pipe(zip(project.name + '_' + project.version + '_' + date + 'min.zip'))
             .pipe(gulp.dest(DIST_PATH));
});

gulp.task('clean:prod', function () {
  return del([path.join(TEMP_PATH, '/**/*'), path.join(PROD_PATH, '/**/ * ')]);
});

gulp.task('build:js:prod', ['clean:prod'], function () {
  var config = {typescript: require('typescript')};
  var tsProject = ts.createProject('tsconfig.json', config);
  var typings = gulp.src(['typings/browser.d.ts']);
  var projectFiles = gulp.src(path.join(SRC_PATH, '**/*.ts'));
  var result = merge(typings, projectFiles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return result.js
               .pipe(sourcemaps.write())
               .pipe(uglify())
               .pipe(gulp.dest(TEMP_PATH))
});

gulp.task('build:assets:prod', ['clean:prod'], function () {
  gulp.src(path.join(SRC_PATH, 'core', 'assets', '**/*')).pipe(gulp.dest(TEMP_PATH));
});

gulp.task('build:html:prod', ['clean:prod'], function () {
  gulp.src(path.join(SRC_PATH, '**/*.html')).pipe(gulp.dest(TEMP_PATH));
});

gulp.task('build:styles:prod', ['clean'], function () {
  var processors = [];
  processors.push(cssnano({discardComments: [{removeAll: true}]}));
  return gulp.src(path.join(SRC_PATH, '**/*.scss'))
             .pipe(sass().on('error', sass.logError))
             .pipe(postcss(processors))
             .pipe(gulp.dest(TEMP_PATH));
});
