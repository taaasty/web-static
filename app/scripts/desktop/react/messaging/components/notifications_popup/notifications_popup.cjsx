window.NotificationsPopup = React.createClass
  mixins: [ScrollerMixin]

  render: ->
    <div className="popup popup--notifications popup--dark">
      <div className="popup__arrow popup__arrow--up" />
      <div className="popup__content">
        <div className="popup__body">
          <div className="notifications">

            <div ref="scroller"
                 className="scroller scroller--dark scroller--notifications">
              <div ref="scrollerPane"
                   className="scroller__pane js-scroller-pane">
                <NotificationsPopup_Notifications />
              </div>
              <div className="scroller__track js-scroller-track">
                <div className="scroller__bar js-scroller-bar"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>