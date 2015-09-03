'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});

var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'tutorials'
    };

    grunt.initConfig({
        config: yeomanConfig,
        watch: {

        },
        connect: {
            livereload: {
                options: {
                    port: 9000,
                    // Change this to '0.0.0.0' to access the server from
                    // outside.
                    hostname: '0.0.0.0',
                    middleware: function(connect) {
                        return [// lrSnippet,
                        function(req, res, next) {

                            if (req.url.match(/\.properties/)) {

                                res.setHeader('Content-Type', 'text/html;charset=ISO-8859-1');

                            }
                            // don't just call next() return it
                            return next();
                        },

                        mountFolder(connect, '.tmp'), mountFolder(connect, yeomanConfig.app)];
                    }
                }
            }

        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.livereload.options.port %>'
            }
        },
        clean: {
            server: '.tmp'
        }

    });

    grunt.registerTask('server', function(target) {

        grunt.task.run(['clean:server', 'connect:livereload', 'open', 'watch']);
    });
};
