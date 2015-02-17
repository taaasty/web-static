UserToolbarListAdditional = React.createClass

  render: ->
    <ul className="toolbar__popup-list toolbar__popup-list--additional">
      <li className="toolbar__popup-item">
        <a href="?m=true"
           className="toolbar__popup-link">
          { i18n.t('user_toolbar.switch_to_desktop_item') }
        </a>
      </li>
    </ul>

module.exports = UserToolbarListAdditional