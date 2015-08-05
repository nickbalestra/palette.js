var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    mochaPhantomJS = require('gulp-mocha-phantomjs');



// Run mocha tests
gulp.task('test-node', function () {
  return gulp.src('./test/spec-node.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('test-browser', function () {
    return gulp
    .src('./test/SpecRunner.html')
    .pipe(mochaPhantomJS({reporter: 'spec'}));
});

gulp.task('test', ['test-node', 'test-browser']);

