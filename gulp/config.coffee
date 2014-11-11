src         = './app'
srcMobile   = './app/mobile'
build       = './build'
buildMobile = './build/mobile'
dist        = './dist'

module.exports = {
  mobile: {
    dist: {
      scripts: {
        baseDir: srcMobile
        extensions: ['.coffee', '.js.jsx.coffee']
        entries: './scripts/bundle.coffee'
        dest: dist + '/scripts/'
        outputName: 'mobile_bundle.js'
      }
      styles: {
        src: srcMobile + '/stylesheets/bundle.less'
        dest: dist + '/stylesheets'
        outputName: 'mobile_bundle.css'
      }
    }
    vendor: {
      baseDir: srcMobile + '/bower_components'
      dest: buildMobile + '/scripts'
      outputName: 'vendor.js'
      extensions: ['.coffee']
    }
    client: {
      entries: srcMobile + '/scripts/main.coffee'
      dest: buildMobile + '/scripts'
      outputName: 'client.js'
      extensions: ['.coffee', '.jsx.coffee']
    }
    html: {
      src: srcMobile + '/html/*.html'
      dest: buildMobile
    }
    less: {
      src: srcMobile + '/stylesheets/main.less'
      dest: buildMobile + '/stylesheets'
      outputName: 'main.css'
    }
    minifyJS: {
      src: dist + '/scripts/mobile_bundle.js'
      dest: dist + '/scripts'
      outputName: 'mobile_bundle.min.js'
    }
    minifyCSS: {
      src: dist + '/stylesheets/mobile_bundle.css'
      dest: dist + '/stylesheets'
      outputName: 'mobile_bundle.min.css'
    }
  }
  dist: {
    scripts: {
      bundle: {
        baseDir: src
        extensions: ['.coffee', '.js.jsx.coffee']
        entries: './scripts/bundle.coffee'
        dest: dist + '/scripts/'
        outputName: 'bundle.js'
      }
      static: {
        baseDir: src
        extensions: ['.js', '.coffee']
        entries: './scripts/static.coffee'
        dest: dist + '/scripts/'
        outputName: 'static.js'
      }
    }
    styles: {
      src: src + '/stylesheets/bundle.less'
      dest: dist + '/stylesheets'
      outputName: 'main.css'
    }
  }
  assets: {
    src: src + '/assets/**/*.{ttf,woff,eof,svg}'
    dest: build + '/assets'
  }
  vendor: {
    baseDir: './app/bower_components'
    dest: build + '/scripts'
    outputName: 'vendor.js'
    extensions: ['.coffee']
  }
  client: {
    entries: src + '/scripts/main.coffee'
    dest: build + '/scripts'
    outputName: 'client.js'
    extensions: ['.coffee', '.js.jsx.coffee']
  }
  browserSync: {
    port: 9000
    open: false
    server: {
      baseDir: [build, src]
    }
    files: [
      build + '/**',
      '!' + build + '/**.map'
    ]
  }
  html: {
    src: src + '/*.html'
    dest: build
  }
  less: {
    src: src + '/stylesheets/main.less'
    dest: build + '/stylesheets'
    outputName: 'main.css'
  }
  minifyJS: {
    bundle: {
      src: dist + '/scripts/bundle.js'
      dest: dist + '/scripts'
      outputName: 'bundle.min.js'
    }
    static: {
      src: dist + '/scripts/static.js'
      dest: dist + '/scripts'
      outputName: 'static.min.js'
    }
  }
  minifyCSS: {
    src: dist + '/stylesheets/main.css'
    dest: dist + '/stylesheets'
    outputName: 'main.min.css'
  }
  clean: {
    dest: build
  }
}