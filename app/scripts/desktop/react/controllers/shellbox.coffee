React = require 'react';
{ render, unmountComponentAtNode } = require 'react-dom';

class window.ReactShellBox

  constructor: ->
    container = document.querySelectorAll('[shellbox-container]')[0]

    unless container
      container = $('<\div>', {'shellbox-container': ''}).appendTo('body')[0]

    @shellboxContainer = container

  show: (Component, args) ->
    render (
      <ShellBox>
        <Component {...args} />
      </ShellBox>
    ), @shellboxContainer

  close: ->
    _.defer =>
      unmountComponentAtNode @shellboxContainer
