import PluginError from 'plugin-error';
import through from 'through2';
import path from 'path';
import File from 'vinyl';
import sourceMap from 'source-map';
import convert from 'convert-source-map';

const PLUGIN_NAME = 'gulp-reverse-sourcemaps';

export default function reverse (sourceRoot) {
  return through.obj(function (file, encoding, done) {
    if (file.isNull()) {
      return done(null, file);
    }

    if (file.isStream()) {
      this.emit( // eslint-disable-line no-invalid-this
        'error', new PluginError(PLUGIN_NAME, 'Streams are not supported'));
      return done();
    }

    if (file.isBuffer()) {
      const input = file.contents.toString(encoding);
      const converter = convert.fromSource(input);

      if (converter !== null) {
        const consumer = new sourceMap.SourceMapConsumer(converter.toJSON());

        if (consumer.hasContentsOfAllSources()) {
          consumer.sources.forEach(source => {
            const content = consumer.sourceContentFor(source);
            const newFile = new File({
              path: sourceRoot ? path.join(sourceRoot, source) : source,
              contents: new Buffer(content),
            });

            this.push(newFile); // eslint-disable-line no-invalid-this
          });

          return done();
        }
      }

      return done(null, file);
    }
  });
}
