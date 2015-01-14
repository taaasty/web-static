PaginationPrev = require './items/prev'
PaginationNext = require './items/next'
{ PropTypes } = React

DaylogPagination = React.createClass
  displayName: 'DaylogPagination'

  propTypes:
    slug:    PropTypes.string.isRequired
    prevDay: PropTypes.string
    nextDay: PropTypes.string

  render: ->
    <div className="pagination">
      { @renderPaginationItems() }
    </div>

  renderPaginationItems: ->
    { prevDay, nextDay, slug } = @props

    paginationItems = []

    if prevDay?
      paginationItems.push <PaginationPrev
                               href={ Routes.daylogPagination(@props.slug, prevDay) }
                               single={ !nextDay? }
                               key="prev" />

    if nextDay?
      paginationItems.push <PaginationNext
                               href={ Routes.daylogPagination(@props.slug, nextDay) }
                               single={ !prevDay? }
                               key="next" />

    paginationItems

module.exports = DaylogPagination