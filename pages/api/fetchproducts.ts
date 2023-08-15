// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { user } = req.query;
      console.log("came");
      console.log(user);
  
      const response = await axios.get(`http://127.0.0.1:5000/api/recommended-products/${user}`);
      const recommendedProducts = response.data;
  
      res.status(200).json(recommendedProducts);
    } catch (error) {
      console.error('Error fetching recommended products:', error);
      res.status(500).json({ error: 'An error occurred while fetching recommended products.' });
    }
  }
