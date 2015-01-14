TlogPaginationPrev = require './items/prev'
TlogPaginationNext = require './items/next'
{ PropTypes } = React

TITLE = 'Смотреть все записи'

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

    switch
      when currentPage == 1 and totalPagesCount == 1 then []
      when currentPage == 1 and totalPagesCount > 1
        <TlogPaginationPrev
            page={ currentPage + 1 }
            slug={ slug }
            single={ true } />
      when totalPagesCount > currentPage > 1
        [
          <TlogPaginationPrev
              page={ currentPage + 1 }
              slug={ slug }
              key="prev" />
          <TlogPaginationNext
              page={ currentPage - 1 }
              slug={ slug }
              key="next" />
        ]
      when currentPage > totalPagesCount
        <TlogPaginationNext
              page={ totalPagesCount }
              slug={ slug }
              single={ true }
              key="next" />
      when currentPage == totalPagesCount
        <TlogPaginationNext
            page={ currentPage - 1 }
            slug={ slug }
            single={ true } />
      else []

module.exports = TlogPagination