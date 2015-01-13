cx = require 'react/lib/cx'
{ PropTypes } = React

#TODO: i18n
TITLE = 'Ранее'

TlogPaginationPrev = React.createClass
  displayName: 'TlogPaginationPrev'

  propTypes:
    page:   PropTypes.number.isRequired
    slug:   PropTypes.string.isRequired
    single: PropTypes.bool.isRequired

  render: ->
    prevClasses = cx
      'pagination__item': true
      'pagination__item--prev': !@props.single

    return <a className={ prevClasses }
              href={ Routes.pagination(@props.slug, @props.page) }
              title={ TITLE }>
             { TITLE }
           </a>

module.exports = TlogPaginationPrev