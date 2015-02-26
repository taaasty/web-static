require('../dist/scripts/mobile_components');
global.TastySettings = { env: 'development' };
var EntryPageProps = require('./mobile_prerender/entryPageProps'),
    FeedBestPageProps = require('./mobile_prerender/feedBestPageProps');

React.renderToString( React.createElement(global.EntryPage, EntryPageProps) );
React.renderToString( React.createElement(global.FeedBestPage, FeedBestPageProps) );