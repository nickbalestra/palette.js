var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    mocha = require('gulp-mocha'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    mochaPhantomJS = require('gulp-mocha-phantomjs');

// Watch on default, build non uglified and run mocha tests
//gulp.task('default', function() {
//  gulp.watch(['./**/*.coffee'], ['build', 'test']);
//});

// Run mocha tests
gulp.task('test', function () {
  return gulp.src('./test/spec-node.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});


// Build compiles coffeeScript into javaScript
gulp.task('build', function() {
  gulp.src('./**/*.coffee')
      .pipe(coffee({bare: true}).on('error', gutil.log))
      .pipe(gulp.dest('./'))
});

// Release, run the build, the tests and on success generate a minified version
gulp.task('release', ['build', 'test'], function(){
  gulp.src('./ctree.js')
      .pipe(uglify())
      .pipe(rename('ctree.min.js'))
      .pipe(gulp.dest('./'))
  gutil.log(gutil.colors.green('Stuff happened...', 'Really, it did'));
});


gulp.task('test-watch', function() {
  gulp.watch(['./**/*.js'], ['test']);
});