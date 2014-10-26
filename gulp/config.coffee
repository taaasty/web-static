src  = './app'
dest = './build'

module.exports = {
  build: {
    vendor: {
      baseDir: './app/bower_components'
      dest: dest + '/scripts'
      outputName: 'vendor.js'
      extensions: ['.coffee']
    }
    client: {
      entries: src + '/scripts/main.coffee'
      dest: dest + '/scripts'
      outputName: 'client.js'
      extensions: ['.coffee', '.js.jsx.coffee']
    }
  }
  browserify: {
    baseDir: src
    extensions: ['.coffee', '.js.jsx.coffee']
    entries: './scripts/resources/tasty.coffee'
    dest: dest + '/scripts/'
    outputName: 'bundle.js'
  }
  browserSync: {
    port: 9000
    server: {
      baseDir: [dest, src]
    }
    files: [
      dest + '/**',
      '!' + dest + '/**.map'
    ]
  }
  html: {
    src: src + '/*.html'
    dest: dest
  }
  less: {
    src: src + '/stylesheets/main.less'
    dest: dest + '/stylesheets'
    outputName: 'main.css'
  }
  minifyJS: {
    src:  dest + '/scripts/bundle.js'
    dest: dest + '/scripts'
    outputName: 'bundle.min.js'
  }
  minifyCSS: {
    src: dest + '/stylesheets/main.css'
    dest: dest + '/stylesheets'
    outputName: 'main.min.css'
  }
  clean: {
    dest: dest
  }
}