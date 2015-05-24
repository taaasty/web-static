import EntryBrickMetabar from './EntryBrickMetabar';

let EntryBrickQuoteType = React.createClass({
  propTypes: {
    entry: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      source: React.PropTypes.string,
      entry_url: React.PropTypes.string.isRequired
    }).isRequired
  },

  render() {
    return (
      <span>
        <div className="brick__body">
          <a href={this.props.entry.entry_url} className="brick__link">
            <blockquote className="blockquote">
              <span className="laquo">«</span>{this.props.entry.text}<span className="raquo">»</span>
              {this.renderQuoteSource()}
            </blockquote>
          </a>
        </div>
        <div className="brick__meta">
          <EntryBrickMetabar
              author={this.props.entry.author}
              rating={this.props.entry.rating}
              commentsCount={this.props.entry.comments_count}
              url={this.props.entry.entry_url} />
        </div>
      </span>
    );
  },

  renderQuoteSource() {
    if (this.props.entry.source) {
      return (
        <span className="blockquote__caption">—
          <span className="blockquote__source">
            <i>{this.props.entry.source}</i>
          </span>
        </span>
      );
    }
  }
});

export default EntryBrickQuoteType;
// <div class="brick__meta"><span class="meta-bar"><span class="meta-item meta-item--vote"><span class="meta-item__content"><span data-react-class="Voting" data-react-props="{&quot;entryId&quot;:20111550,&quot;isVoted&quot;:false,&quot;votes&quot;:0,&quot;rating&quot;:0,&quot;isVoteable&quot;:true,&quot;locale&quot;:&quot;ru&quot;}"><span class="voting votable" data-original-title="(Рейтинг 0) Проголосовать" data-reactid=".a1">0</span></span></span></span><span class="meta-item meta-item--user"><span class="meta-item__content"><a class="meta-item__link" href="http://taaasty.com/~valentina-chizhova" title="~valentina-chizhova"><span class="meta-item__ava"><span class="avatar" style="background-image: url('http://thumbor0.tasty0.ru/yCaLxllilX1ge80g6lBsRyYMKYw=/35x35/filters:no_upscale()/userpic/ff/a6/282253_original.jpg')"><img class="avatar__img" alt="valentina-chizhova" srcset="http://thumbor0.tasty0.ru/002j9j52UTI2oVDzvn-ybvJGHdQ=/70x70/filters:no_upscale()/userpic/ff/a6/282253_original.jpg 2x" src="http://thumbor0.tasty0.ru/yCaLxllilX1ge80g6lBsRyYMKYw=/35x35/filters:no_upscale()/userpic/ff/a6/282253_original.jpg"></span></span>~valentina-chizhova</a></span></span></span></div>