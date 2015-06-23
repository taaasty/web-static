import EditableField from '../common/EditableField';
import FlowFormUpload from './FlowFormUpload';

let FlowFormHero = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    flowpic: React.PropTypes.object.isRequired,
    onNameChange: React.PropTypes.func.isRequired,
    onTitleChange: React.PropTypes.func.isRequired,
    onPicFileChange: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      backgroundImage: ThumborService.newImageUrl(this.props.flowpic.original_url, {
        width: 520,
        height: 286
      })
    };
  },

  render() {
    let heroStyles = {
      backgroundImage: `url("${this.state.backgroundImage}")`
    };

    return (
      <div className="flow-form__hero" style={heroStyles}>
        <FlowFormUpload onUpload={this.handleUpload} />
        <div className="flow-form__hero-box">
          <div className="flow-form__hero-title">
            <EditableField
                value={this.props.name}
                placeholder="#Название потока"
                returnFor="blur"
                onChange={this.props.onNameChange} />
          </div>
          <div className="flow-form__hero-text">
            <EditableField
                value={this.props.title}
                placeholder="Краткое описание, не более 140 символов"
                returnFor="blur"
                onChange={this.props.onTitleChange} />
          </div>
          {this.renderActions()}
        </div>
      </div>
    );
  },

  renderActions() {
    if (this.props.onFlowCreate) {
      return (
        <div className="flow-form__hero-actions">
          <button className="button button--yellow button--small"
                  onClick={this.props.onFlowCreate}>
            Создать поток
          </button>
        </div>
      );
    }
  },

  showPicFilePreview(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({backgroundImage: e.target.result});
    };
    reader.readAsDataURL(file);
  },

  handleUpload(file) {
    this.showPicFilePreview(file);
    this.props.onPicFileChange(file);
  }
});

export default FlowFormHero;