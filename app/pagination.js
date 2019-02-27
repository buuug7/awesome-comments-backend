/**
 *
 * add pre_page_url and next_page_url field to pagination of bookshelf's pagination plugin
 * @param {object} pagination={page: Number,pageSize: Number,rowCount: Number,pageCount: Number,}
 * @param {string} path
 * @return {object}
 */

function addPreAndNextPageUrlToPagination (pagination, path) {
  const currentPage = Number(pagination.page)
  const totalPage = Number(pagination.pageCount)

  let prePage = currentPage - 1
  let nextPage = currentPage + 1

  if (totalPage === 0) {
    prePage = null
    nextPage = null
  }

  return Object.assign(pagination, {
    pre_page_url: prePage > 0 ? `${path}?page=${prePage}` : null,
    next_page_url: nextPage < totalPage ? `${path}?page=${nextPage}` : null,
  })
}

module.exports = { addPreAndNextPageUrlToPagination }

