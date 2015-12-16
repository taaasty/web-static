import React, { PropTypes } from 'react';

class TlogPageText {
  render() {
    return (
      <section className="posts">
        <article>
          <div className="text-content">
            <h2>
              {this.props.text}
            </h2>
          </div>
        </article>
      </section>
    );
  }
}

TlogPageText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TlogPageText;
