var gulp = require('gulp')
  , babel = require('gulp-babel')

gulp.task('babel', function () {
  return gulp.src('src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dest'))
})

gulp.task('watch', function () {
  gulp.watch('src/*.js', ['babel'])
})

gulp.task('default', ['watch', 'babel'])
