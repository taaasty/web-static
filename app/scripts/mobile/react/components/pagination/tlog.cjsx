PaginationPrev = require './items/prev'
PaginationNext = require './items/next'
{ PropTypes } = React

TlogPagination = React.createClass
  displayName: 'TlogPagination'

  propTypes:
    slug:            PropTypes.string.isRequired
    currentPage:     PropTypes.number.isRequired
    totalPagesCount: PropTypes.number.isRequired

  render: ->
    <div className="pagination">
      { @renderPaginationItems() }
    </div>

  renderPaginationItems: ->
    { currentPage, totalPagesCount, slug } = @props

    paginationItems = []

    switch
      when currentPage == 1 and totalPagesCount > 1
        paginationItems.push <PaginationPrev
                                 href={ Routes.tlogPagination(@props.slug, currentPage + 1) }
                                 single={ true }
                                 key="prev" />
      when totalPagesCount > currentPage > 1
        paginationItems.push <PaginationPrev
                                 href={ Routes.tlogPagination(@props.slug, currentPage + 1) }
                                 key="prev" />
        paginationItems.push <PaginationNext
                                 href={ Routes.tlogPagination(@props.slug, currentPage - 1) }
                                 key="next" />
      when currentPage > totalPagesCount
        paginationItems.push <PaginationNext
                                 href={ Routes.tlogPagination(@props.slug, totalPagesCount) }
                                 single={ true }
                                 key="next" />
      when currentPage == totalPagesCount && currentPage != 1
        paginationItems.push <PaginationNext
                                 href={ Routes.tlogPagination(@props.slug, currentPage - 1) }
                                 single={ true }
                                 key="next" />

    paginationItems

module.exports = TlogPagination