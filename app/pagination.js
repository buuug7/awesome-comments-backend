/**
 * sequelize simplePaginate
 *
 * @param {{baseUrl:string, currentPage:number, perPage:number}} pagination
 * @return {object}
 */
module.exports = async function simplePaginate (pagination) {

  let { baseUrl, perPage, currentPage } =
    Object.assign({}, { baseUrl: '', perPage: 10, currentPage: 1 }, pagination)

  let total = await this.count(),
    totalPage = total % perPage === 0 ? total / perPage : parseInt(total / perPage) + 1,
    prePage = currentPage - 1,
    nextPage = currentPage + 1

  if (totalPage === 0) {
    prePage = null
    nextPage = null
  }

  return {
    total: total,
    totalPage: totalPage,
    perPage: perPage,
    currentPage: currentPage,
    prePageUrl: prePage > 0 ? `${baseUrl}?page=${prePage}` : null,
    nextPageUrl: nextPage <= totalPage ? `${baseUrl}?page=${nextPage}` : null,
    data: await this.findAll({
      offset: perPage * (currentPage - 1),
      limit: perPage
    })
  }
}