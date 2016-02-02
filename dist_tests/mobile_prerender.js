require('../dist/scripts/mobilePrerender.development');

var EntryPageProps = require('./mobile_prerender/entryPageProps'),
    FeedBestPageProps = require('./mobile_prerender/feedBestPageProps');

React.renderToString(React.createElement(global.EntryPage, EntryPageProps));
React.renderToString(React.createElement(global.FeedBestPage, FeedBestPageProps));
console.log('Prendering mobile components test finished successfully');