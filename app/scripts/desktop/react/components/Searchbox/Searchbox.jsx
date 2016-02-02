let Searchbox = React.createClass({
  propTypes: {
    searchUrl: React.PropTypes.string.isRequired,
    searchTitleI18nKey: React.PropTypes.string.isRequired,
    searchParam: React.PropTypes.string,
    onClose: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      searchParam: 'q'
    };
  },

  componentDidMount() {
    Mousetrap.bind('esc', this.close);
  },

  componentWillUnmount() {
    Mousetrap.unbind('esc', this.close);
  },

  render() {
    return (
      <div className="searchbox">
        <div className="searchbox__close" onClick={this.close}>
          <i className="icon icon--cross" />
        </div>
        <form action={this.props.searchUrl} className="searchbox__form">
          <h5 className="searchbox__title">
            {i18n.t(`searchbox_titles.${this.props.searchTitleI18nKey}`)}
          </h5>
          <input type="text"
                 name={this.props.searchParam}
                 placeholder={i18n.t('searchbox_placeholder')}
                 autoFocus="true"
                 className="searchbox__input"
                 onKeyDown={this.handleKeyDown} />
        </form>
      </div>
    );
  },

  close() {
    this.props.onClose();
  },

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }
});

export default Searchbox;