'use strict';

module.exports = function ( grunt ) {
	/* configure grunt */

	var srcDir 		= 'lib/',
		srcFiles 	= srcDir + '**/*.js',
		destDir 	= 'dist/',
		outFile 	= destDir + '<%= pkg.name %>.js',
		implDir 	= 'impl/',
		implFiles 	= implDir + '**/*';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			js: {
				files: [ srcFiles ],
				tasks: [ 'jshint:all' , 'browserify:main' ]
			},
			impl: {
				files: [ implFiles ],
				tasks: [ 'jshint:all' , 'browserify:main' ],
				options: {
					livereload: true
				}
			}
		},
		jshint: {
			all: ['Gruntfile.js', srcFiles ],
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			}
		},
		browserify: {
			main: {
				src: [ srcFiles ],
				dest: outFile,
				options: {
					debug: true
				}
			}
		},
		uglify: {
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js' : [ outFile ]
				}
			},
			options: {
				sourceMap: true
			}
		}
	});

	/* load plugins */
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	/* grunt tasks */
	grunt.registerTask('default' , [
		'jshint',
		'browserify',
		'uglify'
	]);
};
