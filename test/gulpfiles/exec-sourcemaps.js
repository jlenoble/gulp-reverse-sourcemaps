import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import destglob from 'destglob';
import reverse from './src/gulp-reverse-sourcemaps';

const glob = 'src/**/*.js';
const dest = 'build';
const dest2 = 'build2';

const sourcemapsGlob = destglob(glob, dest);

gulp.task('sourcemaps', () => {
  return gulp.src(glob, {base: process.cwd()})
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest));
});

gulp.task('reverse', () => {
  return gulp.src(sourcemapsGlob, {base: process.cwd()})
    .pipe(reverse('orig'))
    .pipe(gulp.dest(dest2));
});

gulp.task('reverse-noroot', () => {
  return gulp.src(sourcemapsGlob, {base: process.cwd()})
    .pipe(reverse())
    .pipe(gulp.dest(dest2));
});

gulp.task('default', gulp.series('sourcemaps'));
