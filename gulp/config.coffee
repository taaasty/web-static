src   = './app'
build = './build'
dist  = './dist'

module.exports =
  clean:
    dest: [build, dist]
  browserSync:
    port: 9000
    open: false
    server:
      baseDir: [build, src]
    files: [build + '/**']
  desktop:
    local:
      scripts:
        vendor:
          baseDir: src + '/bower_components'
          dest: build + '/scripts'
          outputName: 'vendor.js'
          extensions: ['.coffee']
        client:
          entries: src + '/scripts/desktop.local.coffee'
          dest: build + '/scripts'
          outputName: 'client.js'
          extensions: ['.jsx', '.cjsx', '.coffee']
      styles:
        src: src + '/stylesheets/desktop.local.less'
        dest: build + '/stylesheets'
        outputName: 'main.css'
      html:
        src: src + '/html/desktop/*.html'
        dest: build
      assets:
        src: src + '/assets/**/*.*'
        dest: build + '/assets'
      locales:
        src: src + '/scripts/desktop/locales/**/*.json'
        dest: build + '/locales'
    production:
      scripts:
        bundle:
          entries: src + '/scripts/desktop.production.coffee'
          extensions: ['.jsx', '.cjsx', '.coffee']
          dest: dist + '/scripts/'
          outputName: 'bundle.js'
        min:
          dest: dist + '/scripts'
          outputName: 'bundle.min.js'
      styles:
        bundle:
          src: src + '/stylesheets/desktop.production.less'
          dest: dist + '/stylesheets'
          outputName: 'bundle.css'
        min:
          dest: dist + '/stylesheets'
          outputName: 'bundle.min.css'
      locales:
        src: src + '/scripts/desktop/locales/**/*.json'
        dest: dist + '/locales/desktop'
  mobile:
    local:
      scripts:
        vendor:
          dest: build + '/mobile/scripts'
          outputName: 'vendor.js'
          extensions: ['.coffee']
        client:
          entries: src + '/scripts/mobile.local.coffee'
          dest: build + '/mobile/scripts'
          outputName: 'client.js'
          extensions: ['.jsx', '.cjsx', '.coffee']
      styles:
        src: src + '/stylesheets/mobile.local.less'
        dest: build + '/mobile/stylesheets'
        outputName: 'main.css'
      html:
        src: src + '/html/mobile/**/*.html'
        dest: build + '/mobile'
      locales:
        src: src + '/scripts/mobile/locales/**/*.json'
        dest: build + '/mobile/locales'
    production:
      scripts:
        bundle:
          entries: src + '/scripts/mobile.production.coffee'
          extensions: ['.jsx', '.cjsx', '.coffee']
          dest: dist + '/scripts/'
          outputName: 'mobile_bundle.js'
        min:
          src: dist + '/scripts/mobile_bundle.js'
          dest: dist + '/scripts'
          outputName: 'mobile_bundle.min.js'
        components:
          entries: src + '/scripts/mobile/components.js'
          extensions: ['.jsx', '.cjsx', '.coffee']
          dest: dist + '/scripts/'
          outputName: 'mobile_components.js'
      styles:
        bundle:
          src: src + '/stylesheets/mobile.production.less'
          dest: dist + '/stylesheets'
          outputName: 'mobile_bundle.css'
        min:
          dest: dist + '/stylesheets'
          outputName: 'mobile_bundle.min.css'
      locales:
        src: src + '/scripts/mobile/locales/**/*.json'
        dest: dist + '/locales/mobile'