// pages/api/products.ts
import path from 'path';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

const productsDBPath = path.join(process.cwd(), 'backend/gridDB/productsDB.csv');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const productData = await fetchProductData();
    res.status(200).json(productData);
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function fetchProductData() {
  const products = [];
  const data = await fs.promises.readFile(productsDBPath, 'utf-8');
  const lines = data.trim().split('\n');
  
  const headers = lines[0].split(',');
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const product:any = {};
    for (let j = 0; j < headers.length; j++) {
      product[headers[j]] = values[j];
    }
    products.push(product);
  }

  return products;
}
