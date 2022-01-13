import { NextApiRequest, NextApiResponse } from "next";
import data from '../serverData/coupons';

export default function Coupons(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).send({ coupons: data })
}