window.ReactUnmountMixin =
  unmount: -> _.defer => React.unmountComponentAtNode @getDOMNode().parentNode

