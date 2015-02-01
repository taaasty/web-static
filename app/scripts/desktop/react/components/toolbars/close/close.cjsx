window.CloseToolbar = React.createClass
  mixins: [TouchMixin]

  render: ->
    <div onClick={ this.props.onClick }
         className="toolbar toolbar--close">
      <div className="toolbar__toggle">
        <i className="icon icon--cross" />
      </div>
    </div>