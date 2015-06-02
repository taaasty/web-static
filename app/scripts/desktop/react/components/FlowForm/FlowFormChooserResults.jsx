import classnames from 'classnames';
import Avatar from '../../../../../shared/react/components/common/Avatar';
import Scroller from '../../common/scroller/scroller';

let FlowFormChooserResults = React.createClass({
  propTypes: {
    results: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number.isRequired,
    onResultClick: React.PropTypes.func.isRequired
  },

  render() {
    let resultList = this.props.results.map((result, i) => {
      let resultClasses = classnames('flow-form__chooser-result', {
        'state--active': i == this.props.selectedIndex
      });

      return (
        <div className={resultClasses}
             key={result.id}
             onTouchTap={this.props.onResultClick.bind(null, result)}>
          <div className="flow-form__user">
            <div className="flow-form__user-avatar">
              <Avatar userpic={result.userpic} size={35} />
            </div>
            <div className="flow-form__user-name">{result.slug}</div>
          </div>
        </div>
      );
    });

    return (
      <Scroller>
        <div className="flow-form__chooser-results">
          {resultList}
        </div>
      </Scroller>
    );
  }
});

export default FlowFormChooserResults;