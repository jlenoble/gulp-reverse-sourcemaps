'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reverse;

var _pluginError = require('plugin-error');

var _pluginError2 = _interopRequireDefault(_pluginError);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _vinyl = require('vinyl');

var _vinyl2 = _interopRequireDefault(_vinyl);

var _sourceMap = require('source-map');

var _sourceMap2 = _interopRequireDefault(_sourceMap);

var _convertSourceMap = require('convert-source-map');

var _convertSourceMap2 = _interopRequireDefault(_convertSourceMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PLUGIN_NAME = 'gulp-reverse-sourcemaps';

function reverse(sourceRoot) {
  return _through2.default.obj(function (file, encoding, done) {
    var _this = this;

    if (file.isNull()) {
      return done(null, file);
    }

    if (file.isStream()) {
      this.emit( // eslint-disable-line no-invalid-this
      'error', new _pluginError2.default(PLUGIN_NAME, 'Streams are not supported'));
      return done();
    }

    if (file.isBuffer()) {
      var input = file.contents.toString(encoding);
      var converter = _convertSourceMap2.default.fromSource(input);

      if (converter !== null) {
        var consumer = new _sourceMap2.default.SourceMapConsumer(converter.toJSON());

        if (consumer.hasContentsOfAllSources()) {
          consumer.sources.forEach(function (source) {
            var content = consumer.sourceContentFor(source);
            var newFile = new _vinyl2.default({
              path: sourceRoot ? _path2.default.join(sourceRoot, source) : source,
              contents: new Buffer(content)
            });

            _this.push(newFile); // eslint-disable-line no-invalid-this
          });

          return done();
        }
      }

      return done(null, file);
    }
  });
}
module.exports = exports.default;