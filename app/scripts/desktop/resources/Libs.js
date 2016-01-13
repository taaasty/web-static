/*global global, require */
import _ from 'lodash';
import jQuery from 'jquery';
import MouseTrap from 'mousetrap';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { Dispatcher } from 'flux';
import EventEmitter from 'eventEmitter';
import moment from 'moment';
import Pusher from 'pusher';
import Modernizr from 'Modernizr';
import Undo from 'undo';
import introJs from 'introJs';

global._ = _;
global.$ = global.jQuery = jQuery;
global.MouseTrap = MouseTrap;
global.React = React;
global.ReactTestUtils = ReactTestUtils;
global.Dispatcher = Dispatcher;
global.EventEmitter = EventEmitter;
global.moment = moment;
global.Pusher = Pusher;
global.Modernizr = Modernizr;
global.Undo = Undo;
global.introJs = introJs;

require('aviator');

require('es5-shim');
require('jquery.mousewheel')(global.jQuery);
require('jquery.scrollto');

require('baron');
require('react-mixin-manager')(global.React);
require('bootstrap.tooltip');

// jQuery UI components
require('jquery.ui.core');
require('jquery.ui.widget');
require('jquery.ui.mouse');
require('jquery.ui.slider');
require('jquery.ui.draggable');
require('jquery.ui.touch-punch');

// jQuery plugins
require('jquery.collage');
require('jquery.connection');
require('jquery.fileupload');
require('jquery.select2');
