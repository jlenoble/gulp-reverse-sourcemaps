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

const PLUGIN_NAME = 'gulp-reverse-sourcemaps';

function reverse(sourceRoot) {
  return _through2.default.obj(function (file, encoding, done) {
    if (file.isNull()) {
      return done(null, file);
    }

    if (file.isStream()) {
      this.emit( // eslint-disable-line no-invalid-this
      'error', new _pluginError2.default(PLUGIN_NAME, 'Streams are not supported'));
      return done();
    }

    if (file.isBuffer()) {
      const input = file.contents.toString(encoding);
      const converter = _convertSourceMap2.default.fromSource(input);

      const consume = async () => {
        if (converter !== null) {
          const consumer = await new _sourceMap2.default.SourceMapConsumer(converter.toJSON());

          if (consumer.hasContentsOfAllSources()) {
            consumer.sources.forEach(source => {
              const content = consumer.sourceContentFor(source);
              const newFile = new _vinyl2.default({
                path: sourceRoot ? _path2.default.join(sourceRoot, source) : source,
                contents: new Buffer(content)
              });

              this.push(newFile); // eslint-disable-line no-invalid-this
            });

            consumer.destroy();
            return done();
          } else {
            consumer.destroy();
          }
        }

        return done(null, file);
      };

      consume();
    }
  });
}
module.exports = exports.default;