'use strict'

const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const sass = require('node-sass');
const inlineTemplate = require('gulp-inline-ng2-template');
const exec = require('child_process').exec;
const mergeStream = require('merge-stream');

// https://github.com/ludohenin/gulp-inline-ng2-template/issues/83#issuecomment-294340750
const scssProcessor = (stylePath, ext, styleFile, cb) => {
	if (ext[0] === '.scss') {
		let sassObj = sass.renderSync({ file: stylePath });

		if (sassObj && sassObj['css']){
			styleFile = sassObj.css.toString('utf8');
		}
	}

	return cb(null, styleFile);
}

/**
 * Clean the previously compiled dist
 */
gulp.task('clean', (cb) => {
	del(['./dist']).then(() => cb());
});

/**
 * Build UI!
 */
gulp.task('build', (cb) => {
	runSequence(
		'clean',
		'build:clean',
		'build:inline',
		'build:setup',
		'build:compile',
		'build:copy-compiled',
		'build:clean',
		cb
	);
});


/**
 * Inline all our templates and styles into the typescript components
 */
gulp.task('build:inline', () => {
	return gulp.src('./src/**/*.ts')
		.pipe(inlineTemplate({
			useRelativePaths: true,
			styleProcessor: scssProcessor,
		}))
		.pipe(gulp.dest('./.build-stage/src'));
});

/**
 * Copy index and tsconfig into our temp folder
 */
gulp.task('build:setup', () => {
	return gulp
		.src(['./index.ts', './tsconfig.json'])
		.pipe(gulp.dest('./.build-stage'));
})

/**
 * Run our inlined typescript through the compiler
 */
gulp.task('build:compile', (cb) => {
	exec('npm run build:ngc', (err) => {
		cb(err);
	});
})

/**
 * Copy all the compiled files, without the typescript
 */
gulp.task('build:copy-compiled', () => {
	return mergeStream(
		gulp.src(['./.build-stage/**/*', '!./.build-stage/**/*.ts'])
			.pipe(gulp.dest('dist')),
		gulp.src(['./.build-stage/**/*.d.ts'])
			.pipe(gulp.dest('dist'))
	);
})

/**
 * Clean up temporary build files
 */
gulp.task('build:clean', (cb) => {
	del(['./.build-stage']).then(() => cb());
});
