import { BaseEntity, Like, QueryBuilder, SelectQueryBuilder } from 'typeorm';
import { Soup } from './entity/Soup';

export interface PaginationParam {
  baseUrl?: string;
  perPage?: number;
  currentPage?: number;
  [propName: string]: any;
}

export async function simplePagination(
  selectQueryBuilder: SelectQueryBuilder<BaseEntity>,
  param: PaginationParam
) {
  let { baseUrl = '', perPage = 3, currentPage = 1 } = param;

  const total = await selectQueryBuilder.getCount();

  perPage = Number(perPage);
  currentPage = Number(currentPage);

  const totalPage =
    total % perPage === 0
      ? total / perPage
      : parseInt((total / perPage).toString()) + 1;

  let prePage = currentPage - 1;
  let nextPage = currentPage + 1;

  if (totalPage === 0) {
    prePage = null;
    nextPage = null;
  }

  const data = await selectQueryBuilder
    .skip(perPage * (currentPage - 1))
    .take(perPage)
    .getMany();

  return {
    total: total,
    totalPage: totalPage,
    perPage: perPage,
    currentPage: currentPage,
    prePageUrl: prePage > 0 ? `${baseUrl}?page=${prePage}` : null,
    nextPageUrl:
      nextPage <= totalPage && nextPage !== null
        ? `${baseUrl}?page=${nextPage}`
        : null,
    data: data
  };
}
