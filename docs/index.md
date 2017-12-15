## Usage !heading

```js
import reverse from 'gulp-reverse-sourcemaps';

gulp.task('reverse', () => {
  return gulp.src('build/src/**/*.js') // Files with sourcemaps comments
    .pipe(reverse()))  // Original files as 'cwd/src/**/*.js'
    .pipe(gulp.dest('build2')); // Original files are written as 'build2/src/**/*.js'
});
```

## License !heading

gulp-reverse-sourcemaps is [MIT licensed](./LICENSE).

© 2017 [Jason Lenoble](mailto:jason.lenoble@gmail.com)
