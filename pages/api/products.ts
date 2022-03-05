import { NextApiRequest, NextApiResponse } from "next";
import { ProductDtoType } from "../../core/entities/interface/product";
import data from '../../constants/serverData/productItems';

export default function Products(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const perPage = 5;
  const page: number = query?.page ? Number(query.page) : 1;
  const startIndex: number = (page - 1) * perPage;

  const sliceData: Array<ProductDtoType> = data.slice(startIndex, perPage * page);
  const result: Array<ProductDtoType> = sliceData.sort((a, b) => b.score - a.score)

  let totalPage = Math.floor(data.length / perPage);
  if (data.length % perPage > 0) {
    totalPage += 1;
  }

  res.status(200).send({ products: result, totalPage })
}