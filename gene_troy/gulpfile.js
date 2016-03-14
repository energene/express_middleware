var gulp = require('gulp'),
  mocha  = require('gulp-mocha'),
  eslint = require('gulp-eslint');

gulp.task('lint', () => {
  return gulp.src(['./*.js', './test/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src(['./test/*.spec.js'])
    .pipe(mocha());
});

gulp.task('watch', () => {
  return gulp.watch(['./*.js', './test/*.js', '!node_modules/**', '!package.json']);
});

gulp.task('default', ['lint', 'test', 'watch']);
