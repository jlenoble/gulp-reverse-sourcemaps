# gulp-reverse-sourcemaps

Takes in files with sourcemaps comments, outputs the original

  * [Usage](#usage)
  * [License](#license)


## Usage

```js
import reverse from 'gulp-reverse-sourcemaps';

gulp.task('reverse', () => {
  return gulp.src('build/src/**/*.js') // Files with sourcemaps comments
    .pipe(reverse()))  // Original files as 'cwd/src/**/*.js'
    .pipe(gulp.dest('build2')); // Original files are written as 'build2/src/**/*.js'
});
```

## License

gulp-reverse-sourcemaps is [MIT licensed](./LICENSE).

© 2017-2018 [Jason Lenoble](mailto:jason.lenoble@gmail.com)
