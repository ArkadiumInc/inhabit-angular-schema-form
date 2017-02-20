const g    = require('gulp');
const less = require('gulp-less');
const gutil = require('gulp-util');
const ngc   = require('gulp-ngc');
const depsToPeer = require('./scripts/dev-to-peer');
const { templates, styles } = require('./scripts/inline-resources');

const TEMP  = './.tscout';
const BUILD = './dist';

g.task('default', [ 'build' ]);

/**
 * Watch task
 */
g.task('watch', [ 'build' ], () => g
    .watch('./src/**/*.*', [ 'resources' ]));

/**
 * Build task
 */
g.task('build', [ 'resources', 'copy:readme', 'copy:package' ]);

/**
 * Inline Angular styles and templates
 */
g.task('resources', [ 'ngc' ], () => g
    .src(`${TEMP}/**/*`)
    .pipe(templates())
    .pipe(styles())
    .pipe(g.dest(BUILD)));

/**
 * Process *.ts files with angular/compiler
 */
g.task('ngc', [ 'less', 'html' ], () => ngc('./src/tsconfig.json'));

/**
 * Process LESS files
 */
g.task('less', () => g
    .src('./src/**/*.less')
    .pipe(less())
    .pipe(g.dest(TEMP)));

/**
 * Copy HTML templates
 */
g.task('html', () => g
    .src('./src/**/*.html')
    .pipe(g.dest(TEMP))
    .on('error', err => gutil.log(err)));

/**
 * Copy README.md
 */
g.task('copy:readme', () => g
    .src('./README.md')
    .pipe(g.dest('./dist/'))
    .on('error', err => gutil.log(err)));

/**
 * Copy package.json and rewrite dependecies to peerDependencies
 */
g.task('copy:package', () => g
    .src('./package.json')
    .pipe(depsToPeer())
    .pipe(g.dest('./dist/'))
    .on('error', err => gutil.log(err)))