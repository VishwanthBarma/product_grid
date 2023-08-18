import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const wishlistDBPath = path.join(process.cwd(), 'backend/gridDB/wishlistDB.csv');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, productId } = req.body;

    try {
      // Check if the cartDB file exists, create if not
      if (!fs.existsSync(wishlistDBPath)) {
        fs.writeFileSync(wishlistDBPath, 'userId,productIds\n');
      }

      // Read the existing cart data
      const wishlistData = fs.readFileSync(wishlistDBPath, 'utf-8');

      // Update cart data with new product
      const updatedWishlistData = `${wishlistData}${userId},${productId}\n`;
      fs.writeFileSync(wishlistDBPath, updatedWishlistData);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
