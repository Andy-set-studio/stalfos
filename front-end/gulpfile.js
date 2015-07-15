/*------------------------------------*\
    MODULES
\*------------------------------------*/

var gulp = require('gulp'),
	wrap = require('gulp-wrap'),
	filesToJson = require('gulp-files-to-json'),
	watch = require('gulp-watch'),
	svgmin = require('gulp-svgmin'),
	nunjucksRender = require('gulp-nunjucks-render'),
	del = require('del'),
	sass = require('gulp-sass'),
	notify = require("gulp-notify"),
	connect = require('gulp-connect'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	minifyCss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer');



/*------------------------------------*\
    GLOBAL VARS
\*------------------------------------*/

var SVG_PATH = 'svg',
	TEMPLATE_PATH = 'templates',
	SCRIPT_PATH = 'scripts',
	SCSS_ROOT_PATH = 'scss',
	SCSS_PATH = SCSS_ROOT_PATH + '/project',
	IMAGE_PATH = 'images',
	WEB_PATH = '../.public';



/*------------------------------------*\
    TASKS
\*------------------------------------*/

// Clean the web path out
gulp.task('clean-web', function(cb) {
	del([ WEB_PATH + '/*' ], {force: true}, function() {
		cb();
	});
});

// Find all SVG and smash into a js file
gulp.task('process-svg', function() {

	return gulp.src(SVG_PATH + '/*.svg')
				.pipe(svgmin())
				.pipe(filesToJson('_site-icons.js'))
				.pipe(wrap('var site_icons = <%= (contents) %>' + ';'))
				.pipe(gulp.dest(SCRIPT_PATH));
});

// Process all the nunjucks templates
gulp.task('process-templates', function() {

	nunjucksRender.nunjucks.configure([TEMPLATE_PATH + '/']);

	return gulp.src(TEMPLATE_PATH + '/*.html')
				.pipe(nunjucksRender())
				.pipe(gulp.dest(WEB_PATH));
});

// Process sass 
gulp.task('process-sass', function () {

	return gulp.src(SCSS_PATH + '/*.scss')
				.pipe(plumber())
				.pipe(sourcemaps.init())
				.pipe(sass().on('error', sass.logError))
				.pipe(autoprefixer())
				.pipe(minifyCss())
				.pipe(sourcemaps.write('.'))
				.pipe(gulp.dest(WEB_PATH + '/css'))
				.pipe(notify("Sass Compiled :)"));
});

// Process JavaScript libs
gulp.task('process-script-libs', function() {

	var sources = [
		SCRIPT_PATH + '/lib/*.js'
	];

	return gulp.src(sources)
				.pipe(plumber())
				.pipe(concat('lib.js'))
				.pipe(uglify())
				.pipe(gulp.dest(WEB_PATH + '/scripts'));
});

// Process JavaScript
gulp.task('process-scripts', function() {

	var sources = [
		SCRIPT_PATH + '/_site-icons.js',
		SCRIPT_PATH + '/_helpers.js',
		SCRIPT_PATH + '/modules/*.js',
		SCRIPT_PATH + '/app.js'
	];

	// Process libs first
	gulp.start('process-script-libs');

	return gulp.src(sources)
				.pipe(plumber())
				.pipe(sourcemaps.init())
				.pipe(concat('app.js'))
				.pipe(uglify())
				.pipe(sourcemaps.write('.'))
				.pipe(gulp.dest(WEB_PATH + '/scripts'));
});

// Process images
gulp.task('process-images', function() {

	return gulp.src([IMAGE_PATH + '/**/*'])
				.pipe(gulp.dest(WEB_PATH + '/images'));
});

// Webserver 
gulp.task('webserver', function() {

	connect.server({
	    root: WEB_PATH,
	    port: 8003,
	    livereload: true
	});

});

// Live reload 
gulp.task('livereload', function () {

	return gulp.src( WEB_PATH + '/**/*' )
		.pipe(connect.reload());
});

// Global serve task. This task basically does everything and should be 
// called to run your webserver
gulp.task('serve', ['clean-web', 'process-svg', 'process-templates', 'process-sass', 'process-scripts', 'process-images'], function() {

	// Watch for changes with SVG
	watch([SVG_PATH + '/*.svg'], function() { gulp.start('process-svg'); });

	// Watch for changes with templates
	watch([TEMPLATE_PATH + '/**/*.html'], function() { gulp.start('process-templates'); });

	// Watch for changes with sass
	watch([SCSS_ROOT_PATH + '/**/*.scss'], function() { gulp.start('process-sass'); });

	// Watch for changes with scripts
	watch([IMAGE_PATH + '/**/*'], function() { gulp.start('process-images'); });

	// Watch for changes with images
	watch([SCRIPT_PATH + '/**/*.js'], function() { gulp.start('process-scripts'); });

	// Watch any file changes in the web path and reload
	watch([WEB_PATH + '/**/*'], function() { gulp.start('livereload'); });

	// Run the webserver 
	gulp.start('webserver');

});


gulp.task('default', function() {

});