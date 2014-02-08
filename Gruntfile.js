module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> */\n',
    watch: {
      all: {
        files: ['./src/**/*.*'],
        tasks: ['default']
      }
    },
    jshint: {
      all: ['Gruntfile.js', './src/**/*.js']
    },
    jasmine_node: {
      specNameMatcher: '_spec',
      projectRoot: './src/test',
      forceExit: true
    },
    browserify: {
      main: {
        src: ['./src/main/*.js'],
        dest: './target/bundle.js',
        options: {
          alias: ['./src/main/boot.js:boot']
        }
      },
      test: {
        src: ['./src/test/*.js'],
        dest: './target/tests.js',
        options: {
          external: ['./src/*.js']
        }
      }
    },
    jasmine : {
      src : './target/bundle.js',
      options : {
        specs : './target/tests.js',
        vendor : []
      }
    },
    uglify: {
      all: {
        files: {
          './target/bundle.min.js': ['./target/bundle.js']
        }
      }
    },
    copy: {
      scripts: {
        expand: true,
        flatten: true,
        cwd: './target',
        src: '*.min.js',
        dest: './public/assets/javascripts/',
        filter: 'isFile'
      }
    },
    connect: {
      server: {
        options: {
          hostname: '*',
          port: 8000,
          base: './public',
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jasmine-node');

  grunt.registerTask('default', ['jshint', 'jasmine_node', 'browserify', 'jasmine', 'uglify']);
  grunt.registerTask('test', ['jasmine_node']);
  grunt.registerTask('serve', ['default', 'copy:scripts', 'connect']);
};
