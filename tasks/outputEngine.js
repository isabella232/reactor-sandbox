'use strict';

var path = require('path');
var files = require('./constants/files');
var packageDescriptor = require('./helpers/getPackageDescriptor')();

module.exports = function(gulp) {
  var turbinePath = packageDescriptor.name === '@reactor/turbine' ?
    process.cwd() :
    path.dirname(require.resolve('@reactor/turbine'));

  var turbine = require(path.join(turbinePath, 'index.js'));

  gulp.task('sandbox:buildEngine', turbine.createBuildTask({
    // Although the sandbox is for manual testing, ENV_TEST should only be used for running
    // automated tests.
    ENV_TEST: false
  }));

  gulp.task('sandbox:outputEngine', ['sandbox:buildEngine'], function() {
    // Copy the built engine from turbine. Take into consideration that this task may be running
    // from within turbine itself.
    var turbinePath;

    if (packageDescriptor.name === '@reactor/turbine') {
      turbinePath = process.cwd();
    } else {
      turbinePath = path.dirname(require.resolve('@reactor/turbine'));
    }

    return gulp
      .src(path.join(turbinePath, 'dist', 'engine.js'))
      .pipe(gulp.dest(path.join(files.OUTPUT_DIRNAME, files.OUTPUT_INCLUDES_DIRNAME, 'js')));
  });
};
