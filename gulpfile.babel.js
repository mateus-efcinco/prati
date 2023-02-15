const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const watchSass = require('gulp-watch-sass');
const debug = require('gulp-debug');

const childProcess = require('child_process');

const ioManifest = require('./IO-manifest.json');

sass.compiler = require('node-sass');

/* Compila os arquivos CSS */
const css = () => {
  return gulp
    .src(ioManifest.paths.sass.src)
    .pipe(sass(ioManifest.options.sass))
    .on('error', sass.logError)
    .pipe(gulp.dest(ioManifest.paths.sass.dest))
    .pipe(debug({ title: 'CSS Compilado:' }));
};
css.description = 'Compila os arquivos CSS';
/* Compila os arquivos CSS */

/* SASS Watch */
const sasswatch = () => {
  watchSass([ioManifest.paths.sass.src], ioManifest.options.sass)
    .pipe(plumber())
    .pipe(sass(ioManifest.options.sass))
    .on('error', sass.logError)
    .pipe(gulp.dest(ioManifest.paths.sass.dest))
    .pipe(debug({ title: 'CSS Compilado:' }));
};
sasswatch.description = 'SASS Watch';
/* SASS Watch */

/* CSS Watch */
const csswatch = sasswatch;
csswatch.description = 'CSS Watch';
/* CSS Watch */

/* Watch */
const watch = sasswatch;
watch.description = 'Watch';
/* Watch */

/* Mostra todas as funções disponíveis */
const help = () => {
  return childProcess.exec('gulp -T', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(stdout);
  });
};
help.description = 'Mostra todas as funções disponíveis';
/* // Mostra todas as funções disponíveis */

export { csswatch, sasswatch, watch, css };

export default help;
