src   = './app'
build = './build'
dist  = './dist'

module.exports = {
  clean: {
    dest: [build, dist]
  }
  browserSync: {
    port: 9000
    open: false
    server: {
      baseDir: [build, src]
    }
    files: [build + '/**']
  }
  desktop: {
    local: {
      scripts: {
        vendor: {
          baseDir: src + '/bower_components'
          dest: build + '/scripts'
          outputName: 'vendor.js'
          extensions: ['.coffee']
        }
        client: {
          entries: src + '/scripts/desktop.local.coffee'
          dest: build + '/scripts'
          outputName: 'client.js'
          extensions: ['.coffee', '.jsx.coffee', '.js.jsx.coffee']
        }
      }
      less: {
        src: src + '/stylesheets/desktop.local.less'
        dest: build + '/stylesheets'
        outputName: 'main.css'
      }
      html: {
        src: src + '/html/desktop/*.html'
        dest: build
      }
      assets: {
        src: src + '/assets/**/*.{ttf,woff,eof,eot,svg}'
        dest: build + '/assets'
      }
    }
    production: {
      scripts: {
        bundle: {
          baseDir: src
          entries: './scripts/desktop.production.coffee'
          extensions: ['.coffee', '.js.jsx.coffee']
          dest: dist + '/scripts/'
          outputName: 'bundle.js'
        }
        minify: {
          src: dist + '/scripts/bundle.js'
          dest: dist + '/scripts'
          outputName: 'bundle.min.js'
        }
      }
      styles: {
        bundle: {
          src: src + '/stylesheets/desktop.production.less'
          dest: dist + '/stylesheets'
          outputName: 'bundle.css'
        }
        minify: {
          src: dist + '/stylesheets/bundle.css'
          dest: dist + '/stylesheets'
          outputName: 'bundle.min.css'
        }
      }
    }
  }
  mobile: {
    local: {
      scripts: {
        vendor: {
          baseDir: src + '/bower_components'
          dest: build + '/mobile/scripts'
          outputName: 'vendor.js'
          extensions: ['.coffee']
        }
        client: {
          entries: src + '/scripts/mobile.local.coffee'
          dest: build + '/mobile/scripts'
          outputName: 'client.js'
          extensions: ['.coffee', '.js.jsx.coffee']
        }
      }
      less: {
        src: src + '/stylesheets/mobile.local.less'
        dest: build + '/mobile/stylesheets'
        outputName: 'main.css'
      }
      html: {
        src: src + '/html/mobile/*.html'
        dest: build + '/mobile'
      }
    }
    production: {
      scripts: {
        bundle: {
          baseDir: src
          entries: './scripts/mobile.production.coffee'
          extensions: ['.coffee', '.js.jsx.coffee']
          dest: dist + '/scripts/'
          outputName: 'mobile_bundle.js'
        }
        minify: {
          src: dist + '/scripts/mobile_bundle.js'
          dest: dist + '/scripts'
          outputName: 'mobile_bundle.min.js'
        }
      }
      styles: {
        bundle: {
          src: src + '/stylesheets/mobile.production.less'
          dest: dist + '/stylesheets'
          outputName: 'mobile_bundle.css'
        }
        minify: {
          src: dist + '/stylesheets/mobile_bundle.css'
          dest: dist + '/stylesheets'
          outputName: 'mobile_bundle.min.css'
        }
      }
    }
  }
}