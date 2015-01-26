i18n = require 'i18next'
cx   = require 'react/lib/cx'
{ PropTypes } = React

TITLE = -> i18n.t 'pagination_prev'

PaginationPrev = React.createClass
  displayName: 'PaginationPrev'

  propTypes:
    href:   PropTypes.string.isRequired
    single: PropTypes.bool

  getDefaultProps: ->
    single: false

  render: ->
    prevClasses = cx
      'pagination__item': true
      'pagination__item--prev': !@props.single

    return <a className={ prevClasses }
              href={ @props.href }
              title={ TITLE() }>
             { TITLE() }
           </a>

module.exports = PaginationPrev