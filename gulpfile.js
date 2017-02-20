const g    = require('gulp');
const ts   = require('gulp-typescript');
const less = require('gulp-less');
const gutil = require('gulp-util');
const ngc   = require('gulp-ngc');
const depsToPeer = require('./scripts/dev-to-peer');
const { templates, styles } = require('./scripts/inline-resources');

const project = ts.createProject('./src/tsconfig.json');

g.task('default', [ 'build' ]);

g.task('watch', [ 'build' ], () => g
    .watch('./src/**/*.*', [ 'typescript' ]));

g.task('build', [ 'resources', 'copy:readme', 'copy:package' ]);

g.task('resources', [ 'typescript' ], () => g
    .src('./dist/**/*.js')
    .pipe(templates())
    .pipe(styles())
    .pipe(g.dest('./dist/')))

g.task('typescript', [ 'less', 'html' ], () => ngc('./src/tsconfig.json'));

g.task('less', () => g
    .src('./src/**/*.less')
    .pipe(less())
    .pipe(g.dest('./dist/')));

g.task('html', () => g
    .src('./src/**/*.html')
    .pipe(g.dest('./dist/'))
    .on('error', err => gutil.log(err)));

g.task('copy:readme', () => g
    .src('./README.md')
    .pipe(g.dest('./dist/'))
    .on('error', err => gutil.log(err)));

g.task('copy:package', () => g
    .src('./package.json')
    .pipe(depsToPeer())
    .pipe(g.dest('./dist/'))
    .on('error', err => gutil.log(err)))