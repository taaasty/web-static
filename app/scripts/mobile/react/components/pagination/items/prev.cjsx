classnames = require 'classnames'
{ PropTypes } = React

PaginationPrev = React.createClass
  displayName: 'PaginationPrev'

  propTypes:
    href:   PropTypes.string.isRequired
    single: PropTypes.bool

  getDefaultProps: ->
    single: false

  render: ->
    prevClasses = classnames('pagination__item', {
      'pagination__item--prev': !@props.single
    })

    return <a className={ prevClasses }
              href={ @props.href }>
             { i18n.t('pagination.prev') }
           </a>

module.exports = PaginationPrev