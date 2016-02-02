/*global global */
import jQuery from 'jquery';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import EventEmitter from 'eventEmitter';
import Pusher from 'pusher';
import moment from 'moment';

global.$ = global.jQuery = jQuery;
global.React = React;
global.ReactTestUtils = ReactTestUtils;
global.EventEmitter = EventEmitter;
global.Pusher = Pusher;
global.moment = moment;
