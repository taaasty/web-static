###* @jsx React.DOM ###

DESIGN_SETTINGS_POPUP_TITLE = 'Управление дизайном'

window.DesignSettingsPopup = React.createClass
  mixins: ['ReactActivitiesMixin', RequesterMixin, ReactShakeMixin]

  propTypes:
    user:          React.PropTypes.object.isRequired
    onUserChanged: React.PropTypes.func.isRequired

  componentDidMount: ->
    # new FileReceiver # инициализируем загрузку ковера в настройках дизайна
    #   hoverClass: "state--drag-hover"
    #   cover:      ".js-cover"
    #   dropables:  [".js-drop-cover"]
    #   inputs:     [".js-upload-cover-input"]
    #   onReady:      (file) -> sendCover file
    #   onReaderLoad: (url) -> setFormCover url

    @props.user.on 'change', @updateStateUser

  componentWillUnmount: ->
    @props.user.off 'change', @updateStateUser

  render: ->
   `<Popup hasActivities={ this.hasActivities() }
           title={ DESIGN_SETTINGS_POPUP_TITLE }
           isDraggable={ true }
           position={{ top: 30, left: 30 }}
           className="popup--settings-design"
           onClose={ this.unmount }>

      <div className="settings-design js-drop-cover">
        <div className="settings-design__drop">
          <div className="settings-design__drop-text">Отпустите картинку и она начнет загружаться</div>
        </div>

        <DesignSettingsPopup_Controls design={ this.props.user.get('design') }
                                      slug={ this.props.user.get('slug') }
                                      activitiesHandler={ this.activitiesHandler }
                                      saveCallback={ this.save } />
      </div>

    </Popup>`

  updateStateUser: (user) -> @props.onUserChanged user

  save: (key, value) ->
    data      = {}
    data[key] = value

    console.log 'save design', key, value
    @incrementActivities()

    @createRequest
      url: Routes.api.design_settings_url @props.user.get('slug')
      data: data
      method: 'PUT'
      success: (design) =>
        newUser = @props.user
        newUser.design = design

        @props.user.set newUser
      error: (data) =>
        @shake()
        TastyNotifyController.errorResponse data
      complete: =>
        @decrementActivities()

   # `<div className="popup popup--settings-design popup--dark ui-draggable" style={{ top: '34px', left: '99px', display: 'block' }}>
   #    <div className="popup__content">
   #      <div className="popup__header">
   #        <div className="popup__headbox js-popup-headbox cursor--move">
   #          <h3 className="popup__title">Управление дизайном</h3>
   #        </div>
   #        <div className="popup__loader js-popup-loader">
   #          <span className="spinner spinner--8x8">
   #            <span className="spinner__icon"></span>
   #          </span>
   #        </div>
   #        <div className="popup__close">
   #          <div className="icon icon--cross"></div>
   #        </div>
   #      </div>
   #      <div className="popup__body">
   #        <div className="settings-design js-drop-cover">
   #          <div className="settings-design__drop">
   #            <div className="settings-design__drop-text">Отпустите картинку и она начнет загружаться</div>
   #          </div>
   #          <div className="settings-design__controls">
   #            <div className="settings-design__control settings-design__control--cover">
   #              <div className="settings-design__control-inner">
   #                <span className="settings-design__valign"></span>
   #                <span className="settings-design__text absolute--left animate--down">Фон блога</span>
   #                <span className="settings-design__text absolute--left animate--up">
   #                  Перетащите или
   #                  <span className="form-upload form-upload--cover">
   #                    <span className="form-upload__text">загрузите</span>
   #                    <input className="form-upload__input js-upload-cover-input" id="layout-cover" name="layout-cover" type="file" />
   #                  </span>
   #                </span>
   #                <span className="settings-design__cover-pixel absolute--right animate--right js-cover-pixel"></span>
   #              </div>
   #            </div>
   #            <div className="settings-design__control settings-design__control--cover-align" data-key="coverAlign">
   #              <div className="settings-design__control-inner">
   #                <span className="settings-design__valign"></span>
   #                <span className="settings-design__text absolute--left animate--down">Настройка фона</span>
   #                <span className="settings-design__state absolute--right animate--right">
   #                  <span className="settings-design__state-i"></span>
   #                </span>
   #                <span className="form-radiogroup form-radiogroup--dotted-list absolute--left animate--up">
   #                  <label className="form-radio form-radio--repeat" htmlFor="tlog-coveralign-justify">
   #                    <span className="form-radio__inner">
   #                      <span className="form-radio__text">по ширине</span>
   #                      <input className="form-radio__input" id="tlog-coveralign-justify" name="coverAlign" type="radio" value="justify" />
   #                    </span>
   #                  </label>
   #                  <label className="form-radio form-radio--repeat form-radio--active" htmlFor="tlog-coveralign-center">
   #                    <span className="form-radio__inner">
   #                      <span className="form-radio__text">по центру</span>
   #                      <input className="form-radio__input" id="tlog-coveralign-center" name="coverAlign" type="radio" value="center" />
   #                    </span>
   #                  </label>
   #                </span>
   #              </div>
   #            </div>
   #            <div className="settings-design__control settings-design__control--header-color" data-key="headerColor">
   #              <div className="settings-design__control-inner">
   #                <span className="settings-design__valign"></span>
   #                <span className="settings-design__text absolute--left animate--down">Заголовок блога</span>
   #                <span className="settings-design__state settings-design__state--radiobutton absolute--right animate--right">
   #                  <span className="settings-design__state-i"></span>
   #                </span>
   #                <span className="form-radiogroup form-radiogroup--radiobuttons form-radiogroup--header-color absolute--left animate--up">
   #                  <label className="form-radio form-radio--white" htmlFor="tlog-headercolor-white">
   #                    <span className="form-radio__inner">
   #                      <span className="form-radio__text">Белый</span>
   #                      <input className="form-radio__input" id="tlog-headercolor-white" name="headerColor" type="radio" value="white" />
   #                    </span>
   #                  </label>
   #                  <label className="form-radio form-radio--black" htmlFor="tlog-headercolor-black">
   #                    <span className="form-radio__inner">
   #                      <span className="form-radio__text">Черный</span>
   #                      <input className="form-radio__input" id="tlog-headercolor-black" name="headerColor" type="radio" value="black" />
   #                    </span>
   #                  </label>
   #                  <label className="form-radio form-radio--white-on-black" htmlFor="tlog-headercolor-whiteonblack">
   #                    <span className="form-radio__inner">
   #                      <span className="form-radio__text">Белый на черном</span>
   #                      <input className="form-radio__input" id="tlog-headercolor-whiteonblack" name="headerColor" type="radio" value="whiteonblack" />
   #                    </span>
   #                  </label>
   #                  <label className="form-radio form-radio--black-on-white form-radio--active" htmlFor="tlog-headercolor-blackonwhite">
   #                    <span className="form-radio__inner">
   #                      <span className="form-radio__text">Черный на белом</span>
   #                      <input className="form-radio__input" id="tlog-headercolor-blackonwhite" name="headerColor" type="radio" value="blackonwhite" />
   #                    </span>
   #                  </label>
   #                </span>
   #              </div>
   #            </div>
   #            <div className="settings-design__control settings-design__control--feed-color" data-key="feedColor">
   #              <div className="settings-design__control-inner">
   #                <span className="settings-design__valign"></span>
   #                <span className="settings-design__text absolute--left animate--down">Цвет ленты и текста</span>
   #                <span className="settings-design__state settings-design__state--radiobutton absolute--right animate--right">
   #                  <span className="settings-design__state-i"></span>
   #                </span>
   #                <span className="form-radiogroup form-radiogroup--radiobuttons form-radiogroup--feed-color absolute--left animate--up">
   #                  <label className="form-radio form-radio--white form-radio--active" htmlFor="tlog-feedcolor-white">
   #                    <span className="form-radio__inner">
   #                      <span className="form-radio__text">Белая</span>
   #                      <input className="form-radio__input" id="tlog-feedcolor-white" name="feedColor" type="radio" value="white" />
   #                    </span>
   #                  </label>
   #                  <label className="form-radio form-radio--black" htmlFor="tlog-feedcolor-black">
   #                    <span className="form-radio__inner">
   #                      <span className="form-radio__text">Чёрная</span>
   #                      <input className="form-radio__input" id="tlog-feedcolor-black" name="feedColor" type="radio" value="black" />
   #                    </span>
   #                  </label>
   #                </span>
   #              </div>
   #            </div>
   #            <div className="settings-design__control settings-design__control--font-type" data-key="fontType">
   #              <div className="settings-design__control-inner">
   #                <span className="settings-design__valign"></span>
   #                <span className="settings-design__text absolute--left animate--down">Шрифт ленты</span>
   #                <span className="settings-design__state absolute--right animate--right">
   #                  <span className="settings-design__state-i">Аа</span>
   #                </span>
   #                <span className="form-radiogroup form-radiogroup--type-font absolute--left animate--up">
   #                  <label className="form-radio form-radio--sans-serif form-radio--active" htmlFor="tlog-fonttype-sans">
   #                    <span className="form-radio__inner">
   #                      <span className="form-radio__text">Аа</span>
   #                      <input className="form-radio__input" id="tlog-fonttype-sans" name="fontType" type="radio" value="sans" />
   #                    </span>
   #                  </label>
   #                  <label className="form-radio form-radio--serif" htmlFor="tlog-fonttype-serif">
   #                    <span className="form-radio__inner">
   #                      <span className="form-radio__text">Аа</span>
   #                      <input className="form-radio__input" id="tlog-fonttype-serif" name="fontType" type="radio" value="serif" />
   #                    </span>
   #                  </label>
   #                </span>
   #              </div>
   #            </div>
   #            <div className="settings-design__control settings-design__control--opacity">
   #              <div className="settings-design__control-inner">
   #                <span className="settings-design__valign"></span>
   #                <span className="settings-design__text absolute--left animate--down">Прозрачность ленты</span>
   #                <span className="form-range form-range--opacity form-range--yellow absolute--left animate--up js-form-range-opacity ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
   #                  <input className="form-range__input" id="opacity-feed" name="feedOpacity" type="text" />
   #                  <div className="ui-slider-range ui-widget-header ui-slider-range-min" style={{ width: '100%' }}></div>
   #                  <a className="ui-slider-handle ui-state-default ui-corner-all" href="#" style={{ left: '100%' }}></a>
   #                </span>
   #                <span className="form-range-value">100%</span>
   #              </div>
   #            </div>
   #          </div>
   #        </div>
   #      </div>
   #    </div>
   #  </div>`

    # <div class="popup popup--settings-design popup--dark ui-draggable" style="top: 34px; left: 99px; display: block;">
    #   <div class="popup__content">
    #     <div class="popup__header">
    #       <div class="popup__headbox js-popup-headbox cursor--move">
    #         <h3 class="popup__title">Управление дизайном</h3>
    #       </div>
    #       <div class="popup__loader js-popup-loader">
    #         <span class="spinner spinner--8x8">
    #           <span class="spinner__icon"></span>
    #         </span>
    #       </div>
    #       <div class="popup__close">
    #         <div class="icon icon--cross"></div>
    #       </div>
    #     </div>
    #     <div class="popup__body">
    #       <div class="settings-design js-drop-cover">
    #         <div class="settings-design__drop">
    #           <div class="settings-design__drop-text">Отпустите картинку и она начнет загружаться</div>
    #         </div>
    #         <div class="settings-design__controls">
    #           <div class="settings-design__control settings-design__control--cover">
    #             <div class="settings-design__control-inner">
    #               <span class="settings-design__valign"></span>
    #               <span class="settings-design__text absolute--left animate--down">Фон блога</span>
    #               <span class="settings-design__text absolute--left animate--up">
    #                 Перетащите или
    #                 <span class="form-upload form-upload--cover">
    #                   <span class="form-upload__text">загрузите</span>
    #                   <input class="form-upload__input js-upload-cover-input" id="layout-cover" name="layout-cover" type="file">
    #                 </span>
    #               </span>
    #               <span class="settings-design__cover-pixel absolute--right animate--right js-cover-pixel"></span>
    #             </div>
    #           </div>
    #           <div class="settings-design__control settings-design__control--cover-align" data-key="coverAlign">
    #             <div class="settings-design__control-inner">
    #               <span class="settings-design__valign"></span>
    #               <span class="settings-design__text absolute--left animate--down">Настройка фона</span>
    #               <span class="settings-design__state absolute--right animate--right">
    #                 <span class="settings-design__state-i"></span>
    #               </span>
    #               <span class="form-radiogroup form-radiogroup--dotted-list absolute--left animate--up">
    #                 <label class="form-radio form-radio--repeat" for="tlog-coveralign-justify">
    #                   <span class="form-radio__inner">
    #                     <span class="form-radio__text">по ширине</span>
    #                     <input class="form-radio__input ng-pristine ng-valid" id="tlog-coveralign-justify" name="coverAlign" ng-change="change()" ng-model="formData.coverAlign" type="radio" value="justify">
    #                   </span>
    #                 </label>
    #                 <label class="form-radio form-radio--repeat form-radio--active" for="tlog-coveralign-center">
    #                   <span class="form-radio__inner">
    #                     <span class="form-radio__text">по центру</span>
    #                     <input class="form-radio__input ng-pristine ng-valid" id="tlog-coveralign-center" name="coverAlign" ng-change="change()" ng-model="formData.coverAlign" type="radio" value="center">
    #                   </span>
    #                 </label>
    #               </span>
    #             </div>
    #           </div>
    #           <div class="settings-design__control settings-design__control--header-color" data-key="headerColor">
    #             <div class="settings-design__control-inner">
    #               <span class="settings-design__valign"></span>
    #               <span class="settings-design__text absolute--left animate--down">Заголовок блога</span>
    #               <span class="settings-design__state settings-design__state--radiobutton absolute--right animate--right">
    #                 <span class="settings-design__state-i"></span>
    #               </span>
    #               <span class="form-radiogroup form-radiogroup--radiobuttons form-radiogroup--header-color absolute--left animate--up">
    #                 <label class="form-radio form-radio--white" for="tlog-headercolor-white">
    #                   <span class="form-radio__inner">
    #                     <span class="form-radio__text">Белый</span>
    #                     <input class="form-radio__input ng-pristine ng-valid" id="tlog-headercolor-white" name="headerColor" ng-change="change()" ng-model="formData.headerColor" type="radio" value="white">
    #                   </span>
    #                 </label>
    #                 <label class="form-radio form-radio--black" for="tlog-headercolor-black">
    #                   <span class="form-radio__inner">
    #                     <span class="form-radio__text">Черный</span>
    #                     <input class="form-radio__input ng-pristine ng-valid" id="tlog-headercolor-black" name="headerColor" ng-change="change()" ng-model="formData.headerColor" type="radio" value="black">
    #                   </span>
    #                 </label>
    #                 <label class="form-radio form-radio--white-on-black" for="tlog-headercolor-whiteonblack">
    #                   <span class="form-radio__inner">
    #                     <span class="form-radio__text">Белый на черном</span>
    #                     <input class="form-radio__input ng-pristine ng-valid" id="tlog-headercolor-whiteonblack" name="headerColor" ng-change="change()" ng-model="formData.headerColor" type="radio" value="whiteonblack">
    #                   </span>
    #                 </label>
    #                 <label class="form-radio form-radio--black-on-white form-radio--active" for="tlog-headercolor-blackonwhite">
    #                   <span class="form-radio__inner">
    #                     <span class="form-radio__text">Черный на белом</span>
    #                     <input class="form-radio__input ng-pristine ng-valid" id="tlog-headercolor-blackonwhite" name="headerColor" ng-change="change()" ng-model="formData.headerColor" type="radio" value="blackonwhite">
    #                   </span>
    #                 </label>
    #               </span>
    #             </div>
    #           </div>
    #           <div class="settings-design__control settings-design__control--feed-color" data-key="feedColor">
    #             <div class="settings-design__control-inner">
    #               <span class="settings-design__valign"></span>
    #               <span class="settings-design__text absolute--left animate--down">Цвет ленты и текста</span>
    #               <span class="settings-design__state settings-design__state--radiobutton absolute--right animate--right">
    #                 <span class="settings-design__state-i"></span>
    #               </span>
    #               <span class="form-radiogroup form-radiogroup--radiobuttons form-radiogroup--feed-color absolute--left animate--up">
    #                 <label class="form-radio form-radio--white form-radio--active" for="tlog-feedcolor-white">
    #                   <span class="form-radio__inner">
    #                     <span class="form-radio__text">Белая</span>
    #                     <input class="form-radio__input ng-pristine ng-valid" id="tlog-feedcolor-white" name="feedColor" ng-change="change()" ng-model="formData.feedColor" type="radio" value="white">
    #                   </span>
    #                 </label>
    #                 <label class="form-radio form-radio--black" for="tlog-feedcolor-black">
    #                   <span class="form-radio__inner">
    #                     <span class="form-radio__text">Чёрная</span>
    #                     <input class="form-radio__input ng-pristine ng-valid" id="tlog-feedcolor-black" name="feedColor" ng-change="change()" ng-model="formData.feedColor" type="radio" value="black">
    #                   </span>
    #                 </label>
    #               </span>
    #             </div>
    #           </div>
    #           <div class="settings-design__control settings-design__control--font-type" data-key="fontType">
    #             <div class="settings-design__control-inner">
    #               <span class="settings-design__valign"></span>
    #               <span class="settings-design__text absolute--left animate--down">Шрифт ленты</span>
    #               <span class="settings-design__state absolute--right animate--right">
    #                 <span class="settings-design__state-i">Аа</span>
    #               </span>
    #               <span class="form-radiogroup form-radiogroup--type-font absolute--left animate--up">
    #                 <label class="form-radio form-radio--sans-serif form-radio--active" for="tlog-fonttype-sans">
    #                   <span class="form-radio__inner">
    #                     <span class="form-radio__text">Аа</span>
    #                     <input class="form-radio__input ng-pristine ng-valid" id="tlog-fonttype-sans" name="fontType" ng-change="change()" ng-model="formData.fontType" type="radio" value="sans">
    #                   </span>
    #                 </label>
    #                 <label class="form-radio form-radio--serif" for="tlog-fonttype-serif">
    #                   <span class="form-radio__inner">
    #                     <span class="form-radio__text">Аа</span>
    #                     <input class="form-radio__input ng-pristine ng-valid" id="tlog-fonttype-serif" name="fontType" ng-change="change()" ng-model="formData.fontType" type="radio" value="serif">
    #                   </span>
    #                 </label>
    #               </span>
    #             </div>
    #           </div>
    #           <div class="settings-design__control settings-design__control--opacity">
    #             <div class="settings-design__control-inner">
    #               <span class="settings-design__valign"></span>
    #               <span class="settings-design__text absolute--left animate--down">Прозрачность ленты</span>
    #               <span class="form-range form-range--opacity form-range--yellow absolute--left animate--up js-form-range-opacity ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
    #                 <input class="form-range__input ng-pristine ng-valid" id="opacity-feed" name="feedOpacity" ng-model="formData.feedOpacity" type="text">
    #                 <div class="ui-slider-range ui-widget-header ui-slider-range-min" style="width: 100%;"></div>
    #                 <a class="ui-slider-handle ui-state-default ui-corner-all" href="#" style="left: 100%;"></a>
    #               </span>
    #               <span class="form-range-value ng-binding">100%</span>
    #             </div>
    #           </div>
    #         </div>
    #       </div>
    #     </div>
    #   </div>
    # </div>