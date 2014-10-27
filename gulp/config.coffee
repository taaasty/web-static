src   = './app'
dest  = './dist'
build = './build'

module.exports = {
  build: {
    scripts: {
      baseDir: src
      extensions: ['.coffee', '.js.jsx.coffee']
      entries: './scripts/bundle.coffee'
      dest: build + '/scripts/'
      outputName: 'bundle.js'
    }
    styles: {
      src: src + '/stylesheets/main.less'
      dest: build + '/stylesheets'
      outputName: 'main.css'
    }
  }
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
    src:  build + '/scripts/bundle.js'
    dest: build + '/scripts'
    outputName: 'bundle.min.js'
  }
  minifyCSS: {
    src: build + '/stylesheets/main.css'
    dest: build + '/stylesheets'
    outputName: 'main.min.css'
  }
  clean: {
    dest: dest
  }
}