#= require jquery.connection
#
class window.GuidePopup
  settings:
    popup: ".js-guide-popup"
    pages: ".js-guide-popup-pages"
    page: ".js-guide-popup-page"
    media: ".js-guide-popup-media"
    mediaItem: ".js-guide-popup-media-item"
    next: ".js-guide-popup-next"
    navClass: "guide-popup__nav"
    navItemClass: "guide-popup__nav-item"
    guideEnabledClass: "guide-popup-enabled"
    activeClass: "state--active"
    afterClass: "is--after"
    beforeClass: "is--before"
  
  # Elements
  $popup: null
  $pages: null # block pages of guide
  $page: null
  $media: null
  $mediaItem: null
  $next: null # button forward
  $navItem: null
  
  # Variables
  count: null # length of pages
  current: 0 # active page
  finished: false
  pagesData: {}
  mediaData: {}
  posData: {}
  
  # Functions
  constructor: (options) ->
    settings = @settings
    settings.popup = options.popup if options?.popup?

    @$popup = $(settings.popup)
    @$pages = @$popup.find(settings.pages)
    @$page = @$popup.find(settings.page)
    @$media = @$popup.find(settings.media)
    @$mediaItem = @$popup.find(settings.mediaItem)
    @$next = @$popup.find(settings.next)
    @count = @$page.length
    
    # jQuery Connection initialization
    $(".js-connection-start").connection
      connectionEnd:       ".js-connection-end"
      connectionLineClass: "guide-popup__connection-line"

    @_collectData @pagesData, @$page
    @_collectData @mediaData, @$mediaItem
    @initNav()
    @animate @current
    @_initEvents()
    return

  _collectData: (objectData, collection) ->
    $.map collection, (item, i) ->
      id = $(item).data("media-id")
      objectData[i] = id  if id
      return

    return

  _initEvents: ->
    self = this
    @$next.on "click", (e) ->
      e.preventDefault()
      self.animate self.current + 1
      return

    return

  initNav: ->
    @createNav()
    @initEventsNav()
    return

  createNav: ->
    settings = @settings
    nav = ""
    navItems = ""
    i = 0
    active = undefined

    while i < @count
      navItems += "<div class=\"" + settings.navItemClass + "\">" + "<i class=\"" + settings.navItemClass + "-i\">" + i + "</i>" + "</div>"
      i++
    nav += "<div class=\"" + settings.navClass + "\">" + navItems + "</div>"
    @$popup.prepend nav
    @$navItem = @$popup.find("." + settings.navItemClass)
    return

  initEventsNav: ->
    self = this
    self.$navItem.on "click", ->
      target = $(this).index()
      self.animate target  unless self.current is target
      return

    return

  changeNavItem: (target) ->
    settings = @settings
    @$navItem.eq(@current).removeClass(settings.activeClass).end().eq(target).addClass settings.activeClass
    return

  changePage: (target) ->
    self = this
    settings = @settings
    oldMediaId = undefined
    newMediaId = undefined
    clearClasses = "" + settings.activeClass + " " + settings.afterClass + " " + settings.beforeClass
    @$page.removeClass(clearClasses).each (i) ->
      newClass = ""
      newMediaId = self.pagesData[i]
      if i < target
        newClass = settings.beforeClass
        self.posData[newMediaId] = "before"  if newMediaId and oldMediaId isnt newMediaId
      else if i > target
        newClass = settings.afterClass
        self.posData[newMediaId] = "after"  if newMediaId and oldMediaId isnt newMediaId
      else if i is target
        newClass = settings.activeClass
        oldMediaId = newMediaId
        self.posData[newMediaId] = "active"  if newMediaId
      $(this).addClass newClass
      return

    @$mediaItem.removeClass(clearClasses).each (i) ->
      newClass = ""
      switch self.posData[self.mediaData[i]]
        when "before"
          newClass = settings.beforeClass
        when "after"
          newClass = settings.afterClass
        when "active"
          newClass = settings.activeClass
      $(this).addClass newClass
      return

    return

  animate: (target) ->
    finished = @endGuide(target)
    unless finished # or flag this.finished
      @changeNavItem target
      @changePage target
      @setCurrent target
    else
      guideEnabledClass = @settings.guideEnabledClass
      $("." + guideEnabledClass).removeClass guideEnabledClass
      expires = new Date(Date.now())
      expires.setFullYear expires.getFullYear() + 1
      setCookie "saw_guide", true,
        expires: expires

    return

  endGuide: (target) ->
    settings = @settings
    if target > @count - 1
      @$popup.fadeOut 300
      @finished = true
    else
      @finished = false
    action = ((if target >= @count - 1 then "addClass" else "removeClass"))
    @$next[action] settings.activeClass
    @finished

  setCurrent: (target) ->
    @current = target
    return

