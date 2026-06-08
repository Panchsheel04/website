// Showcase catalog grouped into switchable categories. Each item keeps the same
// shape ({ id, name, motif, image, thumb }) so every tab renders with the
// identical lookbook layout. Images are currently shared across categories as
// placeholders — drop dedicated artwork into /public and swap the paths here.
const img = (n) => ({
  image: `/bedsheets/bedsheet-${n}.webp`,
  thumb: `/bedsheets/bedsheet-${n}-thumb.webp`,
});

export const showcaseCategories = [
  {
    id: 'bedsheets',
    label: 'Bedsheets',
    items: [
      { id: 1, name: 'Azure Bloom', motif: 'Floral', ...img(1) },
      { id: 2, name: 'Saffron Stripe', motif: 'Stripe', ...img(2) },
      { id: 3, name: 'Ivory Fern', motif: 'Botanical', ...img(3) },
      { id: 4, name: 'Ocean Paisley', motif: 'Paisley', ...img(7) },
      { id: 5, name: 'Rose Grid', motif: 'Geometric', ...img(8) },
      { id: 6, name: 'Mint Trellis', motif: 'Trellis', ...img(9) },
      { id: 7, name: 'Royal Mist', motif: 'Abstract', ...img(10) },
      { id: 8, name: 'Sunlit Vine', motif: 'Vine print', ...img(11) },
      { id: 9, name: 'Classic Hotel', motif: 'Border', ...img(12) },
      { id: 10, name: 'Lagoon Checks', motif: 'Checks', ...img(4) },
      { id: 11, name: 'Clay Garden', motif: 'Floral', ...img(5) },
      { id: 12, name: 'Pearl Dobby', motif: 'Texture', ...img(6) },
    ],
  },
  {
    id: 'handkerchiefs',
    label: 'Handkerchiefs',
    items: [
      { id: 1, name: 'Petal Edge', motif: 'Floral border', ...img(1) },
      { id: 2, name: 'Pinstripe Classic', motif: 'Stripe', ...img(2) },
      { id: 3, name: 'Leaf Whisper', motif: 'Botanical', ...img(3) },
      { id: 4, name: 'Paisley Fold', motif: 'Paisley', ...img(7) },
      { id: 5, name: 'Soft Check', motif: 'Checks', ...img(4) },
      { id: 6, name: 'Pure Cotton', motif: 'Plain weave', ...img(6) },
    ],
  },
  {
    id: 'pillow-covers',
    label: 'Pillow Covers',
    items: [
      { id: 1, name: 'Bloom Sham', motif: 'Floral', ...img(5) },
      { id: 2, name: 'Trellis Cushion', motif: 'Trellis', ...img(9) },
      { id: 3, name: 'Grid Accent', motif: 'Geometric', ...img(8) },
      { id: 4, name: 'Vine Bolster', motif: 'Vine print', ...img(11) },
      { id: 5, name: 'Hotel Piped', motif: 'Border', ...img(12) },
      { id: 6, name: 'Misty Velvet', motif: 'Abstract', ...img(10) },
    ],
  },
  {
    id: 'accessories',
    label: 'Accessories',
    items: [
      { id: 1, name: 'Dohar Throw', motif: 'Lightweight quilt', ...img(3) },
      { id: 2, name: 'Bed Runner', motif: 'Accent strip', ...img(2) },
      { id: 3, name: 'Cushion Set', motif: 'Coordinated', ...img(5) },
      { id: 4, name: 'Table Linen', motif: 'Checks', ...img(4) },
      { id: 5, name: 'Bath Towel', motif: 'Texture', ...img(6) },
      { id: 6, name: 'Comforter', motif: 'Floral', ...img(1) },
    ],
  },
];
