#= require angular
#= require angular-resource/angular-resource
#= require quick-ng-repeat/quick-ng-repeat
#= require ng-rails-csrf
#= require ngInfiniteScroll
#= require angular-sanitize/angular-sanitize
#= require_self
#= require_tree ./directives/
#= require_tree ./filters/
#= require_tree ./services/
#= require_tree ./controllers/
#
# Приложение на angular

window.AApp = angular.module 'AApp', [
  'infinite-scroll', 
  'ngResource', 'ngSanitize', 'ng-rails-csrf']

window.AApp.config ['$sceDelegateProvider', ($sceDelegateProvider) ->
    ##$compileProvider.imgSrcSanitizationWhitelist(/^\s*(blob):/);
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      '**'
      #'http://a0.tcdn.ru/**',
      #'http://a1.tcdn.ru/**',
      #'http://a2.tcdn.ru/**',
      #'http://a3.tcdn.ru/**',
      #'http://a4.tcdn.ru/**',
      #'http://a5.tcdn.ru/**',
      #'http://a6.tcdn.ru/**',
      #'http://a7.tcdn.ru/**',
      #'http://a8.tcdn.ru/**',
      #'http://a9.tcdn.ru/**'
    ])

    #$compileProvider.urlSanitizationWhitelist /^\s*(https?|ftp|mailto):/
  ]
