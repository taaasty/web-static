import React, { PropTypes } from 'react';

function TlogPageText({ text }) {
  return (
    <section className="posts">
      <article>
        <div className="text-content">
          <h2>
            {text}
          </h2>
        </div>
      </article>
    </section>
  );
}

TlogPageText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TlogPageText;
