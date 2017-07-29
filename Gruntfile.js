module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      css: {
        files: ['sass/*.scss'],
        tasks: ['sasslint', 'sass']
      },
      js: {
        files: ['js/*.js'],
        tasks: ['jshint']
      }
    },

    sass: {
      default: {
        options: {
          sourceMap: true,
          outputStyle: 'compressed'
        },
        files: {
          'css/main.css': 'sass/main.scss'
        }
      }
    },

    sasslint: {
        options: {
          configFile: '.sass-lint.yml'
        },
        default: ['sass/*.scss']
      },

      jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
        default: {
          src: ['Gruntfile.js', 'js/*.js']
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-sass-lint');

  grunt.registerTask('default', ['watch']);


};