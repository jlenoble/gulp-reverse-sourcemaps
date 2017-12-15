import testGulpProcess, {isFound, nextTask} from 'test-gulp-process';
import equalFileContents from 'equal-file-contents';
import destglob from 'destglob';

describe('Testing Gulpfile', function () {
  it(`Reverting a transpile task with sourcemaps`, testGulpProcess({
    sources: ['src/**/*.js', 'test/**/*.js', 'gulp/**/*.js'],
    gulpfile: 'test/gulpfiles/exec-sourcemaps.js',
    task: ['sourcemaps', 'reverse'],
    debug: true,

    messages: [
      `Starting 'sourcemaps'...`,
      [`Finished 'sourcemaps' after`,
        isFound('src/gulp-reverse-sourcemaps.js'),
        isFound('build/src/gulp-reverse-sourcemaps.js'),
        nextTask()],
      `Starting 'reverse'...`,
      [`Finished 'reverse' after`,
        isFound('build2/orig/src/gulp-reverse-sourcemaps.js')],
    ],

    onSuccess () {
      const [glob] = destglob('src/gulp-reverse-sourcemaps.js', this.dest);
      const [dest] = destglob('build2/orig', this.dest);
      return equalFileContents(glob, dest);
    },
  }));

  it(`Reverting a transpile task with sourcemaps - no root`, testGulpProcess({
    sources: ['src/**/*.js', 'test/**/*.js', 'gulp/**/*.js'],
    gulpfile: 'test/gulpfiles/exec-sourcemaps.js',
    task: ['sourcemaps', 'reverse-noroot'],
    debug: true,

    messages: [
      `Starting 'sourcemaps'...`,
      [`Finished 'sourcemaps' after`,
        isFound('src/gulp-reverse-sourcemaps.js'),
        isFound('build/src/gulp-reverse-sourcemaps.js'),
        nextTask()],
      `Starting 'reverse-noroot'...`,
      [`Finished 'reverse-noroot' after`,
        isFound('build2/src/gulp-reverse-sourcemaps.js')],
    ],

    onSuccess () {
      const [glob] = destglob('src/gulp-reverse-sourcemaps.js', this.dest);
      const [dest] = destglob('build2', this.dest);
      return equalFileContents(glob, dest);
    },
  }));
});
