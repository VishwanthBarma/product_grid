import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const wishlistDBPath = path.join(process.cwd(), 'backend/gridDB/wishlistDB.csv');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, productId } = req.body;

    try {
      // Check if the wishlistDB file exists
      if (!fs.existsSync(wishlistDBPath)) {
        return res.status(400).json({ error: 'Wishlist data not found' });
      }

      // Read the existing wishlist data
      const wishlistData = fs.readFileSync(wishlistDBPath, 'utf-8');

      // Find and remove the product entry
      const updatedWishlistData = wishlistData
        .split('\n')
        .filter((line) => {
          const [lineUserId, lineProductId] = line.trim().split(',');
          return !(lineUserId == userId && lineProductId == productId);
        })
        .join('\n');

      fs.writeFileSync(wishlistDBPath, updatedWishlistData);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
