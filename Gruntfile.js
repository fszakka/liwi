'use strict';

module.exports = function ( grunt ) {
	/* configure grunt */

	var srcDir  = 'lib/**/*.js',
		destDir = 'dist/',
		outFile = destDir + '<%= pkg.name %>.js';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['Gruntfile.js', srcDir ],
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			}
		},
		browserify: {
			main: {
				src: [ srcDir ],
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
