cx = require 'react/lib/cx'
{ PropTypes } = React

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
              href={ @props.href }>
             { i18n.t('pagination.next') }
           </a>

module.exports = PaginationNext