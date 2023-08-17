import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const cartDBPath = path.join(process.cwd(), 'backend/gridDB/cartDB.csv');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, productId } = req.body;

    try {
      // Check if the cartDB file exists, create if not
      if (!fs.existsSync(cartDBPath)) {
        fs.writeFileSync(cartDBPath, 'userId,productIds\n');
      }

      // Read the existing cart data
      const cartData = fs.readFileSync(cartDBPath, 'utf-8');

      // Update cart data with new product
      const updatedCartData = `${cartData}${userId},${productId}\n`;
      fs.writeFileSync(cartDBPath, updatedCartData);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
