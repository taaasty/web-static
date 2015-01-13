cx = require 'react/lib/cx'
{ PropTypes } = React

#TODO: i18n
TITLE = 'Позже'

TlogPaginationNext = React.createClass
  displayName: 'TlogPaginationNext'

  propTypes:
    page:   PropTypes.number.isRequired
    slug:   PropTypes.string.isRequired
    single: PropTypes.bool.isRequired

  render: ->
    nextClasses = cx
      'pagination__item': true
      'pagination__item--next': !@props.single

    return <a className={ nextClasses }
              href={ Routes.pagination(@props.slug, @props.page) }
              title={ TITLE }>
             { TITLE }
           </a>

module.exports = TlogPaginationNext