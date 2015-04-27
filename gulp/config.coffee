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
    scripts:
      static:
        vendor:
          baseDir: src + '/bower_components'
          dest: build + '/scripts'
          outputName: 'vendor.js'
          extensions: ['.coffee']
        client:
          entries: src + '/scripts/desktop.static.js'
          dest: build + '/scripts'
          outputName: 'client.js'
          extensions: ['.jsx', '.cjsx', '.coffee']
      development:
        bundle:
          entries: src + '/scripts/desktop.development.js'
          extensions: ['.jsx', '.cjsx', '.coffee']
          dest: dist + '/scripts/'
          outputName: 'desktop.development.js'
      production:
        bundle:
          entries: src + '/scripts/desktop.production.js'
          extensions: ['.jsx', '.cjsx', '.coffee']
          dest: dist + '/scripts/'
          outputName: 'desktop.production.js'
    styles:
      static:
        src: src + '/stylesheets/desktop.static.less'
        dest: build + '/stylesheets'
        outputName: 'main.css'
      production:
        src: src + '/stylesheets/desktop.production.less'
        dest: dist + '/stylesheets'
        outputName: 'desktop.production.css'
    html:
      static:
        src: src + '/html/desktop/*.html'
        dest: build
    assets:
      static:
        src: src + '/assets/**/*.*'
        dest: build + '/assets'
    locales:
      static:
        src: src + '/scripts/desktop/locales/**/*.json'
        dest: build + '/locales'
      production:
        src: src + '/scripts/desktop/locales/**/*.json'
        dest: dist + '/locales/desktop'
  mobile:
    scripts:
      static:
        vendor:
          dest: build + '/mobile/scripts'
          outputName: 'vendor.js'
          extensions: ['.coffee']
        client:
          entries: src + '/scripts/mobile.static.js'
          dest: build + '/mobile/scripts'
          outputName: 'client.js'
          extensions: ['.jsx', '.cjsx', '.coffee']
      development:
        bundle:
          entries: src + '/scripts/mobile.development.js'
          extensions: ['.jsx', '.cjsx', '.coffee']
          dest: dist + '/scripts/'
          outputName: 'mobile.development.js'
        components:
          entries: src + '/scripts/mobilePrerender.development.js'
          extensions: ['.jsx', '.cjsx', '.coffee']
          dest: dist + '/scripts/'
          outputName: 'mobilePrerender.development.js'
      production:
        bundle:
          entries: src + '/scripts/mobile.production.js'
          extensions: ['.jsx', '.cjsx', '.coffee']
          dest: dist + '/scripts/'
          outputName: 'mobile.production.js'
        components:
          entries: src + '/scripts/mobilePrerender.production.js'
          extensions: ['.jsx', '.cjsx', '.coffee']
          dest: dist + '/scripts/'
          outputName: 'mobilePrerender.production.js'
    styles:
      static:
        src: src + '/stylesheets/mobile.static.less'
        dest: build + '/mobile/stylesheets'
        outputName: 'main.css'
      production:
        src: src + '/stylesheets/mobile.production.less'
        dest: dist + '/stylesheets'
        outputName: 'mobile.production.css'
    html:
      static:
        src: src + '/html/mobile/**/*.html'
        dest: build + '/mobile'
    locales:
      static:
        src: src + '/scripts/mobile/locales/**/*.json'
        dest: build + '/mobile/locales'
      production:
        src: src + '/scripts/mobile/locales/**/*.json'
        dest: dist + '/locales/mobile'