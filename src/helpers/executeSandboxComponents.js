/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const childProcess = require('child_process');
const path = require('path');
const fsExtra = require('fs-extra');

const cwd = path.join(path.dirname(__filename), '../../');

module.exports = () => {
  fsExtra.readdir(cwd + '/dist', function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      console.log(file);
    });
  });

  const child = childProcess.spawn('npm', ['start'], {
    cwd
  });

  child.stdout.on('data', (data) => {
    // eslint-disable-next-line no-console
    console.log('got some data ',data.toString());
  });

  child.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.log(`One of the sandbox components crashed: ${err}`);
    process.exit(1);
  });
};
