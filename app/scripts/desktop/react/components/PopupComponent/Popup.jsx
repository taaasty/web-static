import managePositions from '../../../../shared/react/components/higherOrder/managePositions'
import PopupHeader from './PopupHeader';

let Popup = React.createClass({
  mixins: ['ReactActivitiesMixin'],

  propTypes: {
    title: React.PropTypes.string.isRequired,
    position: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
    draggable: React.PropTypes.bool,
    onClose: React.PropTypes.func.isRequired,
    onPositionChange: React.PropTypes.func.isRequired,
    children: React.PropTypes.element.isRequired
  },

  componentDidMount() {
    if (this.props.draggable) {
      this.makeDraggable();
    }
  },

  componentWillReceiveProps(nextProps) {
    // FIXME: Почему-то стили которые указаны в style не применяются при перерендере
    // Устанавливаем их принудительно при обновлении
    $(this.getDOMNode()).css(nextProps.position);
  },

  render() {
    let popupClasses = ['popup', this.props.className].join(' ');
    let children = React.Children.map(this.props.children, ((child) =>
      React.cloneElement(child, {activitiesHandler: this.activitiesHandler})
    ));

    return (
      <div className={popupClasses}
           style={this.props.position}
           onMouseDown={this.handleClick}
           onTouchStart={this.handleClick}>
        <PopupHeader
            ref="header"
            title={this.props.title}
            hasActivities={this.hasActivities()}
            draggable={this.props.draggable}
            onClose={this.props.onClose} />
        <div className="popup__body">
          {children}
        </div>
      </div>
    );
  },

  makeDraggable() {
    let $popup = $(this.getDOMNode()),
        $header = $(this.refs.header.getDOMNode());

    $popup.draggable({
      handle: $header,
      drag: () => $popup.addClass('no--transition'),
      stop: (event, ui) => {
        this.props.onPositionChange(ui.position);
        $popup.removeClass('no--transition');
      }
    });
  },

  handleClick(e) {
    let popups = [].slice.call(document.querySelectorAll('.popup')),
        currentNode = this.getDOMNode();

    Object.keys(popups).forEach((key) => {
      let node = popups[key];

      if (node == currentNode) {
        node.classList.add('front-layer');
        node.classList.remove('back-layer');
      } else {
        node.classList.add('back-layer');
        node.classList.remove('front-layer');
      }
    });
  }
});

Popup = managePositions(Popup);

export default Popup;