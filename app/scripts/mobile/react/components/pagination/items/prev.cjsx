cx = require 'react/lib/cx'
{ PropTypes } = React

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
              href={ @props.href }>
             { i18n.t('pagination_prev') }
           </a>

module.exports = PaginationPrev