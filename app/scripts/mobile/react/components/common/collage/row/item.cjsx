{ PropTypes } = React

CollageItem = React.createClass
  displayName: 'CollageItem'

  propTypes:
    image: PropTypes.object.isRequired

  render: ->
    <div className="collage__item"
         style={ @getStyles() }>
      <img src={ @props.image.payload.url } />
    </div>

  getStyles: ->
    { width, height } = @props.image

    { width }

module.exports = CollageItem