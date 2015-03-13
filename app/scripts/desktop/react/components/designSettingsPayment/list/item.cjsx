{ PropTypes } = React

DesignSettingsPaymentListItem = React.createClass
  displayName: 'DesignSettingsPaymentListItem'

  propTypes:
    title: PropTypes.string.isRequired

  render: ->
    <li className="payment__item">
      <div className="payment__item-title"
           dangerouslySetInnerHTML={{ __html: @props.title }} />
      <div className="payment__item-content">
        { @props.children }
      </div>
    </li>

module.exports = DesignSettingsPaymentListItem