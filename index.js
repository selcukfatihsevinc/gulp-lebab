var gutil       = require('gulp-util');
var through     = require('through2');
var transformer = require('lebab');

module.exports = function (options) {

    options = options || {};

    return through.obj(function (file, encoding, callback) {

        if (file.isNull())
            return callback(null, file);

        if (file.isStream())
            return callback(new gutil.PluginError('gulp-lebab', 'Streaming not supported'));

        try {
            var output = transformer.transform(file.contents.toString(), [
                'arrow',
                'for-of',
                'for-each',
                'arg-rest',
                'arg-spread',
                'obj-method',
                'obj-shorthand',
                'no-strict',
                'commonjs',
                'exponent',
                'multi-var',
                'let',
                'class',
                'template',
                'default-param',
                'includes'
            ]);

            file.contents = new Buffer(output.code);
            this.push(file);
        } 
        catch (err) {
            this.emit('error', new gutil.PluginError('gulp-lebab', err, {fileName: file.path, showProperties: false}));
        }

        callback();
    });
};
