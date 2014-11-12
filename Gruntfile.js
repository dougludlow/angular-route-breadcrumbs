// Generated on 2014-11-07 using generator-angular 0.9.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    src: 'src',
    dist: 'dist',
    demo: 'demo',
    public: 'public',
    temp: '.temp'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: [
          '<%= yeoman.demo %>/scripts/{,*/}*.js',
          '<%= yeoman.src %>/{,*/}*.js'
        ],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/**/*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.demo %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.demo %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.demo %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.demo)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.demo)
            ];
          }
        }
      },
      demo: {
        options: {
          open: true,
          base: '<%= yeoman.public %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.demo %>/scripts/{,*/}*.js',
          '<%= yeoman.src %>/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: 'dist',
      demo: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.public %>/{,*/}*',
            '!<%= yeoman.public %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      demo: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.demo %>/index.html'],
        ignorePath: /\.\.\//,
        devDependencies: true,
      },
      sass: {
        src: ['<%= yeoman.demo %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//,
        devDependencies: true,
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.demo %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.demo %>/images',
        javascriptsDir: '<%= yeoman.demo %>/scripts',
        fontsDir: '<%= yeoman.demo %>/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      demo: {
        options: {
          generatedImagesDir: '<%= yeoman.public %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      demo: {
        src: [
          '<%= yeoman.public %>/scripts/{,*/}*.js',
          '<%= yeoman.public %>/styles/{,*/}*.css',
          '<%= yeoman.public %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.public %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.demo %>/index.html',
      options: {
        dest: '<%= yeoman.public %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.public %>/{,*/}*.html'],
      css: ['<%= yeoman.public %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.public %>', '<%= yeoman.public %>/images']
      }
    },

    // The following *-min tasks will produce minified files in the demo folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   demo: {
    //     files: {
    //       '<%= yeoman.public %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   demo: {
    //     files: {
    //       '<%= yeoman.public %>/scripts/scripts.js': [
    //         '<%= yeoman.public %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   demo: {}
    // },

    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '{,*/}*.js',
          dest: '<%= yeoman.dist %>',
          ext: '.min.js'
        }]
      }
    },

    concat: {
      dist: {
        src: [
          'node_modules/grunt-traceur/node_modules/traceur/bin/traceur-runtime.js',
          '<%= yeoman.temp %>/{,*/}*.js'
        ],
        dest: '<%= yeoman.dist %>/angular-route-breadcrumbs.js'
      },
      es6: {
        src: '<%= yeoman.temp %>/{,*/}*.js',
        dest: '<%= yeoman.dist %>/angular-route-breadcrumbs.es6.js'
      }
    },

    imagemin: {
      demo: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.demo %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.public %>/images'
        }]
      }
    },

    svgmin: {
      demo: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.demo %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.public %>/images'
        }]
      }
    },

    htmlmin: {
      demo: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.public %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.public %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        expand: true,
        src: ['<%= yeoman.temp %>/*.js']
      },
      demo: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: ['*.js', '!oldieshim.js'],
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      demo: {
        html: ['<%= yeoman.public %>/*.html']
      }
    },

    copy: {
      // Copies remaining files to places other tasks can use
      demo: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.demo %>',
          dest: '<%= yeoman.public %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.public %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= yeoman.public %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.demo %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      temp: {
        expand: true,
        cwd: '<%= yeoman.src %>',
        dest: '<%= yeoman.temp %>',
        src: '{,*/}*.js'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      demo: [
        'compass:demo',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    traceur: {
      options: {
        // traceur options here
      },
      dist: {
        expand: true,
        src: ['<%= yeoman.temp %>/*.js']
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
    if (target === 'demo') {
      return grunt.task.run(['build', 'connect:demo:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build:dist', [
    'clean:dist',
    'copy:temp',
    'traceur:dist',
    'ngAnnotate:dist',
    'concat:dist',
    'concat:es6',
    'uglify:dist',
  ]);

  grunt.registerTask('build:demo', [
    'clean:demo',
    'wiredep',
    'useminPrepare',
    'concurrent:demo',
    'autoprefixer',
    'ngAnnotate:demo',
    'copy:demo',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('build', [
    'build:dist',
    'build:demo'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
