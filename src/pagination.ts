interface PaginationParam {
  baseUrl?: string;
  perPage?: number;
  currentPage?: number;
}

export async function simplePagination(param: PaginationParam) {
  const { baseUrl = '', perPage = 10, currentPage = 1 } = param;
  const total = await this.count();

  const totalPage = total % perPage === 0 ? total / perPage : total / perPage + 1;

  let prePage = currentPage - 1;
  let nextPage = currentPage + 1;

  if (totalPage === 0) {
    prePage = null;
    nextPage = null;
  }

  return {
    total: total,
    totalPage: totalPage,
    perPage: perPage,
    currentPage: currentPage,
    prePageUrl: prePage > 0 ? `${baseUrl}?page=${prePage}` : null,
    nextPageUrl: nextPage <= totalPage ? `${baseUrl}?page=${nextPage}` : null,
    data: await this.find({
      skip: perPage * (currentPage - 1),
      take: perPage
    })
  };
}
