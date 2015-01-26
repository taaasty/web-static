i18n = require 'i18next'
cx   = require 'react/lib/cx'
{ PropTypes } = React

TITLE = -> i18n.t 'pagination_next'

PaginationNext = React.createClass
  displayName: 'PaginationNext'

  propTypes:
    href:   PropTypes.string.isRequired
    single: PropTypes.bool

  getDefaultProps: ->
    single: false

  render: ->
    nextClasses = cx
      'pagination__item': true
      'pagination__item--next': !@props.single

    return <a className={ nextClasses }
              href={ @props.href }
              title={ TITLE() }>
             { TITLE() }
           </a>

module.exports = PaginationNext