_ = require 'lodash'
jss = require 'jss'

sheet = jss.createStyleSheet({}, named: false).attach()
sheet.element.setAttribute 'design-settings-sheet', ''

DesignStatesService =
  page: document.body
  pageCover: document.querySelector '.page-cover'
  feed: document.querySelector '.content-area__bg'

  states:
    headerFont:          'designtlog-headerfont'
    headerSize:          'designtlog-headersize'
    headerColor:         'designtlog-headercolor'
    backgroundColor:     'designtlog-bgcolor'
    backgroundAlignment: 'designtlog-bgalignment'
    feedBackgroundColor: 'designtlog-feedbgcolor'
    feedFont:            'designtlog-feedfont'
    feedFontColor:       'designtlog-feedcolor'

  switchableStates:
    backgroundImageEnabled: 'designtlog-bgimage-none'

  classNames:
    headerFont: [
      {
        value: 'proximanova'
        className: 'proximanova'
      }
      {
        value: 'notoserif'
        className: 'notoserif'
      }
      {
        value: 'comfortaa'
        className: 'comfortaa'
      }
      {
        value: 'airbornepilot'
        className: 'airbornepilot'
      }
      {
        value: 'amaranth'
        className: 'amaranth'
      }
      {
        value: 'beermoney'
        className: 'beermoney'
      }
      {
        value: 'dancingscript'
        className: 'dancingscript'
      }
      {
        value: 'greatvibes'
        className: 'greatvibes'
      }
      {
        value: 'veles'
        className: 'veles'
      }
      {
        value: 'zion'
        className: 'zion'
      }
      {
        value: 'nautilus'
        className: 'nautilus'
      }
      {
        value: 'ospdin'
        className: 'ospdin'
      }
      {
        value: 'pecita'
        className: 'pecita'
      }
      {
        value: 'poetsen'
        className: 'poetsen'
      }
      {
        value: 'yessireebob'
        className: 'yessireebob'
      }
    ]
    headerSize: [
      {
        value: 'small'
        className: 'small'
      }
      {
        value: 'middle'
        className: 'middle'
      }
      {
        value: 'large'
        className: 'large'
      }
    ]
    headerColor: [
      {
        value: '#ffffff'
        className: 'white'
      }
      {
        value: '#000000'
        className: 'black'
      }
      {
        value: ':ANY:'
        className: 'custom'
      }
      {
        value: '#2ac67e'
        className: 'shamrock'
      }
      {
        value: '#e74c3c'
        className: 'cinnabar'
      }
      {
        value: '#6c7a89'
        className: 'bluegray'
      }
      {
        value: '#38434e'
        className: 'madison'
      }
    ]
    backgroundColor: [
      {
        value: '#ffffff'
        className: 'white'
      }
      {
        value: '#000000'
        className: 'black'
      }
      {
        value: ':ANY:'
        className: 'custom'
      }
      {
        value: '#e74c3c'
        className: 'cinnabar'
      }
      {
        value: '#c6c9cc'
        className: 'silversand'
      }
      {
        value: '#6c7a89'
        className: 'bluegray'
      }
    ]
    backgroundAlignment: [
      {
        value: 'justify'
        className: 'justify'
      }
      {
        value: 'center'
        className: 'center'
      }
    ]
    feedBackgroundColor: [
      {
        value: '#ffffff'
        className: 'white'
      }
      {
        value: '#000000'
        className: 'black'
      }
      {
        value: ':ANY:'
        className: 'custom'
      }
      {
        value: '#e74c3c'
        className: 'cinnabar'
      }
      {
        value: '#c6c9cc'
        className: 'silversand'
      }
      {
        value: '#6c7a89'
        className: 'bluegray'
      }
    ]
    feedFont: [
      {
        value: 'ptsans'
        className: 'ptsans'
      }
      {
        value: 'ptserif'
        className: 'ptserif'
      }
      {
        value: 'roboto'
        className: 'roboto'
      }
      {
        value: 'lora'
        className: 'lora'
      }
      {
        value: 'philosopher'
        className: 'philosopher'
      }
      {
        value: 'ptmono'
        className: 'ptmono'
      }
      {
        value: 'berenisadfpro'
        className: 'berenisadfpro'
      }
      {
        value: 'djserif'
        className: 'djserif'
      }
      {
        value: 'heuristica'
        className: 'heuristica'
      }
      {
        value: 'permian'
        className: 'permian'
      }
      {
        value: 'robotoslab'
        className: 'robotoslab'
      }
      {
        value: 'clearsans'
        className: 'clearsans'
      }
    ]
    feedFontColor: [
      {
        value: '#ffffff'
        className: 'white'
      }
      {
        value: '#000000'
        className: 'black'
      }
      {
        value: '#c6c9cc'
        className: 'silversand'
      }
      {
        value: '#6c7a89'
        className: 'bluegray'
      }
      {
        value: '#38434e'
        className: 'madison'
      }
    ]

  rules:
    headerColor: (value) ->
      '.design-settings__option--headercolor .design-settings__state-i':
        'border-color': value
        'background-color': value
      '.hero':
        'color': value

    backgroundColor: (value) ->
      '.design-settings__option--bgcolor .design-settings__state-i':
        'border-color': value
        'background-color': value
      '.page-cover':
        'background-color': value

    feedBackgroundColor: (value) ->
      '.design-settings__option--feedbgcolor .design-settings__state-i':
        'border-color': value
        'background-color': value

      '.content-area__bg':
        'background-color': value

  apply: (design) ->
    states = {}
    switchableStates = {}

    _.forEach design, (val, state) =>
      switch
        when @states[state] then states[state] = val
        when @switchableStates[state] then switchableStates[state] = val

    classes = @page.className.split(' ').filter (className) =>
      for k of states
        return false if className.indexOf(@states[k]) == 0

      for m of switchableStates
        return false if @switchableStates[m] is className
      true

    _.forEach states, (value, state) =>
      propertyClassName = @getPropertyClassName state, value
      newClass = @states[state] + '-' + propertyClassName
      classes.push newClass

    _.forEach switchableStates, (value, state) =>
      if value
        newClass = @switchableStates[state]
        classes.push newClass

    _.forEach states, (value, state) =>
      # Устанавливаем кастомные цвета через <style>
      propertyClassName = @getPropertyClassName state, value
      @setStyles state, value if propertyClassName is 'custom'

    if design.backgroundImageUrl
      @pageCover.style.backgroundImage = 'url("' + design.backgroundImageUrl + '")'

    if _.isNumber design.feedTransparency
      # У пользователей свойство называется прозрачность, чем выше значение, тем
      # прозрачнее должен быть фон ленты. Но в стилях есть только НЕпрозрачность.
      # Конвертируем значение прозрачности в НЕпрозрачность.
      # Например:
      # .16 прозрачности == .84 НЕпрозрачности.
      opacity = 1 - design.feedTransparency
      @feed.style.opacity = opacity

    @page.className = _.trim classes.join ' '

  getPropertyClassName: (option, value) ->
    propertyAny = null

    return throw new Error("Неизвестная опция #{option}") unless @classNames[option]

    for property in @classNames[option]
      if property.value is ':ANY:' then propertyAny = property
      if property.value is value then return property.className

    return propertyAny.className if propertyAny?.className
    null

  setStyles: (option, value) ->
    rule = @rules[option]

    return throw new Error("Неизвестная опция #{option}") unless rule

    sheet.addRules rule(value)

module.exports = DesignStatesService








# jss                           = require 'jss'
# DesignSettingsMixin           = require './mixins/designSettings'
# DesignSettings_Color          = require './common/color'
# DesignSettings_Checkbox       = require './common/checkbox'
# DesignSettings_SaveButton     = require './buttons/save'
# DesignSettings_PageBackground = require './pageBackground'
# DesignSettings_FeedOpacity    = require './feedOpacity'
# DesignSettings_Font           = require './font'
# DesignSettings_FontSize       = require './fontSize'
# DesignSettings_ProductLayout  = require './productLayout'
# DesignSettings_ProductsInRow  = require './productsInRow'
# { PropTypes } = React

# #TODO: i18n
# DESIGN_SETTINGS_TITLE = 'Управление дизайном'

# DesignSettings = React.createClass
#   mixins: [DesignSettingsMixin]

#   propTypes:
#     pageColor:           PropTypes.object.isRequired
#     pageBackground:      PropTypes.object.isRequired
#     feedColor:           PropTypes.object.isRequired
#     feedOpacity:         PropTypes.object.isRequired
#     font:                PropTypes.object.isRequired
#     fontColor:           PropTypes.object.isRequired
#     fontSize:            PropTypes.object.isRequired
#     activeElementsColor: PropTypes.object.isRequired
#     productLayout:       PropTypes.object.isRequired
#     catalog:             PropTypes.object.isRequired
#     productsInRow:       PropTypes.object.isRequired
#     mainPage:            PropTypes.object.isRequired

#   getInitialState: ->
#     initialSettings = _.reduce @props, (result, n, key) =>
#       result[key] = @props[key].value
#       result
#     , {}

#     settings: initialSettings

#   componentDidMount: ->
#     @sheet = jss.createStyleSheet({},
#       named: false
#       link: true
#     ).attach()
#     window.sheet = @sheet
#     @sheet.element.setAttribute 'design-settings-sheet', ''

#   componentWillUnmount: ->
#     @sheet.detach()
#     @sheet = null

#   render: ->
#     <div className="b-design-option">
#       <div className="b-design-option__title">
#         { DESIGN_SETTINGS_TITLE }
#       </div>
#       <div className="b-design-option__close" />
#       <div className="b-design-option__body">
#         <DesignSettings_Color
#             value={ this.state.settings.pageColor }
#             title={ this.props.pageColor.title }
#             items={ this.props.pageColor.items }
#             onChange={ this.updateSettings.bind(null, this.props.pageColor.optionName) } />
#         <DesignSettings_PageBackground
#             value={ this.state.settings.pageBackground }
#             title={ this.props.pageBackground.title }
#             items={ this.props.pageBackground.items }
#             onChange={ this.updateSettings.bind(null, this.props.pageBackground.optionName) } />
#         <DesignSettings_Color
#             value={ this.state.settings.feedColor }
#             title={ this.props.feedColor.title }
#             items={ this.props.feedColor.items }
#             onChange={ this.updateSettings.bind(null, this.props.feedColor.optionName) } />
#         <DesignSettings_FeedOpacity
#             value={ this.state.settings.feedOpacity }
#             title={ this.props.feedOpacity.title }
#             onChange={ this.updateSettings.bind(null, this.props.feedOpacity.optionName) } />
#         <DesignSettings_Color
#             value={ this.state.settings.fontColor }
#             title={ this.props.fontColor.title }
#             items={ this.props.fontColor.items }
#             onChange={ this.updateSettings.bind(null, this.props.fontColor.optionName) } />
#         <DesignSettings_Color
#             value={ this.state.settings.activeElementsColor }
#             title={ this.props.activeElementsColor.title }
#             items={ this.props.activeElementsColor.items }
#             onChange={ this.updateSettings.bind(null, this.props.activeElementsColor.optionName) } />
#         <DesignSettings_Font
#             value={ this.state.settings.font }
#             title={ this.props.font.title }
#             items={ this.props.font.items }
#             onChange={ this.updateSettings.bind(null, this.props.font.optionName) } />
#         <DesignSettings_FontSize
#             value={ this.state.settings.fontSize }
#             title={ this.props.fontSize.title }
#             from={ this.props.fontSize.from }
#             to={ this.props.fontSize.to }
#             onChange={ this.updateSettings.bind(null, this.props.fontSize.optionName) } />
#         <DesignSettings_ProductLayout
#             value={ this.state.settings.productLayout }
#             title={ this.props.productLayout.title }
#             items={ this.props.productLayout.items }
#             onChange={ this.updateSettings.bind(null, this.props.productLayout.optionName) } />
#         <DesignSettings_Checkbox
#             value={ this.state.settings.catalog }
#             title={ this.props.catalog.title }
#             items={ this.props.catalog.items }
#             onChange={ this.updateSettings.bind(null, this.props.catalog.optionName) } />
#         <DesignSettings_ProductsInRow
#             value={ this.state.settings.productsInRow }
#             title={ this.props.productsInRow.title }
#             from={ this.props.productsInRow.from }
#             to={ this.props.productsInRow.to }
#             onChange={ this.updateSettings.bind(null, this.props.productsInRow.optionName) } />
#         <DesignSettings_Checkbox
#             value={ this.state.settings.mainPage }
#             title={ this.props.mainPage.title }
#             items={ this.props.mainPage.items }
#             onChange={ this.updateSettings.bind(null, this.props.mainPage.optionName) } />
#       </div>
#       <DesignSettings_SaveButton onClick={ this.saveSettings } />
#     </div>

#   updateSettings: (optionName, value) ->
#     newSettings = @state.settings
#     newSettings[optionName] = value

#     pageEl = document.querySelector '.b-page'
#     activeElSelectors = [
#       '.b-btn'
#       '.b-paginator__item'
#       '.pagination .next a'
#       '.pagination .prev a'
#       '.pagination .first a'
#       '.pagination .last a'
#       '.pagination .page a'
#     ]

#     switch optionName
#       when 'pageColor'           then @setStyles '.b-page', 'background-color': value
#       when 'pageBackground'      then @setStyles '.b-page', 'background-image': "url('#{ value }')"
#       when 'feedColor'           then @setStyles '.b-page__content__inner', 'background-color__color': value
#       when 'feedOpacity'         then @setStyles '.b-page__content__inner', 'background-color__opacity': value
#       when 'fontColor'           then @setStyles '.b-page', 'color': value
#       when 'activeElementsColor' then @setStyles activeElSelectors.join(', '), 'color': value
#       when 'font'                then setDesignClass(pageEl, 'b-page_ff-', value) if pageEl?
#       when 'fontSize'            then @setStyles '.b-page', 'font-size': "#{ value }px"
#       when 'productsInRow'       then pageEl.setAttribute 'data-in-row', value if pageEl?
#       when 'productLayout'
#         setDesignClass(pageEl, 'b-page_layout-', value) if pageEl?
#         $(window).trigger 'resize' # Сергей Дёмин сказал, что это нужно для карусели
#       # when 'catalog'
#       #   setDesignClass(pageEl, 'b-page_catalog-', value) if pageEl?
#       # when 'mainPage'
#       else console.warn? 'Unknown type of design option', optionName

#     @setState(settings: newSettings)

#   saveSettings: ->
#     console.log 'saveSettings', @state.settings

#   setStyles: (selector, styles = {}) ->
#     rule      = @sheet.getRule selector
#     newStyles = {}

#     # Если у одного элемента могут изменяться и цвет и прозрачность,
#     # для свойства мы добавляем нужный постфикс вида __color или __opacity.
#     _.map styles, (value, key) ->
#       match = /(.*)__(\w+)/g.exec key
#       if match?
#         rgba = rule?.prop('background-color') || 'rgba(0,0,0,1)'

#         switch match[2]
#           when 'color'            
#             updatedRgba = changeBackgroundColor rgba, value
#             newStyles['background-color'] = updatedRgba
#           when 'opacity'
#             updatedRgba = changeAlpha rgba, value
#             newStyles['background-color'] = updatedRgba
#       else newStyles[key] = value

#     if rule?
#       _.map newStyles, (value, key) -> rule.prop key, value
#     else
#       @sheet.addRule selector, newStyles

# module.exports = DesignSettings

# hexToRgb = (hex) ->
#   shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
#   hex            = hex.replace shorthandRegex, (m, r, g, b) -> r + r + g + g + b + b
#   result         = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec hex
#   if result then [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] else null

# changeBackgroundColor = (rgba, hex) ->
#   match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,)?(\s*\d+[\.\d+]*)*\)/g.exec rgba
#   rgb   = hexToRgb hex
#   a     = parseFloat(match[4]) || 1

#   'rgba(' + [rgb[0], rgb[1], rgb[2], a].join(',') + ')'

# changeAlpha = (rgba, a) ->
#   # Удалил временно регексп, потому что coffee-reactify не может собрать
#   a     = if a > 1 then a / 100 else a

#   'rgba(' + [match[1], match[2], match[3], a].join(',') + ')'

# setDesignClass = (el, name, value) ->
#   classes = el.className.split(' ').filter (c) ->
#     c.lastIndexOf(name, 0) != 0

#   classes.push name + value

#   document.body.className = _.trim classes.join(' ')