import { Service } from '../types';

export const services: Service[] = [
  {
    id: 'premium-takedown',
    name: 'Premium Takedown',
    description:
      'Professional and gentle takedown service for your locs or protective style.',
    price: 150,
    durationMinutes: 360, // 6 hours
    category: 'Locs',
    basePrice: 150,
    active: true,
    addOns: [
      { name: 'Deep Conditioning', price: 30 },
      { name: 'Hot Oil Treatment', price: 25 },
    ],
  },
  {
    id: 'standard-retwist',
    name: 'Standard Retwist',
    description: 'Professional loc maintenance and retwisting service',
    price: 85,
    durationMinutes: 180, // 3 hours
    category: 'Locs',
    basePrice: 85,
    active: true,
    addOns: [
      { name: 'Two-Strand Twist', price: 10 },
      { name: 'Barrel Twist', price: 10 },
    ],
  },
  {
    id: '1',
    name: 'Y2K Princess Cut',
    description:
      'A layered cut with lots of texture and face-framing pieces, perfect for a throwback look.',
    price: 120,
    durationMinutes: 180, // 3 hours
    category: 'Cuts & Styling',
    basePrice: 120,
    active: true,
    addOns: [
      { name: 'Deep Conditioning', price: 20 },
      { name: 'Keratin Treatment', price: 150 },
    ],
  },
  {
    id: '2',
    name: 'Cyber Glam Blowout',
    description:
      'A voluminous blowout with a modern, sleek finish. Includes wash and conditioning.',
    price: 100,
    durationMinutes: 180, // 3 hours
    category: 'Cuts & Styling',
    basePrice: 100,
    active: true,
    addOns: [
      { name: 'Wash & Condition', price: 30 },
      { name: 'Hot Oil Treatment', price: 20 },
    ],
  },
  {
    id: '3',
    name: 'Hot Pink Pop',
    description:
      'Vibrant, all-over hot pink color. A bold statement for the daring.',
    price: 200,
    durationMinutes: 180, // 3 hours
    category: 'Color Services',
    basePrice: 200,
    active: true,
    addOns: [
      { name: 'Olaplex Treatment', price: 50 },
      { name: 'Glitter Gloss', price: 30 },
    ],
  },
  {
    id: '4',
    name: 'Chunky Highlights',
    description:
      'Bold, contrasting highlights for that classic Y2K vibe. Price may vary based on length.',
    price: 175,
    durationMinutes: 180, // 3 hours
    category: 'Color Services',
    basePrice: 175,
    active: true,
    addOns: [
      { name: 'Olaplex Treatment', price: 50 },
      { name: 'Glitter Gloss', price: 30 },
    ],
  },
  {
    id: '5',
    name: 'Glitter Gloss Treatment',
    description:
      'A deep conditioning treatment that leaves your hair silky smooth with a hint of shimmer.',
    price: 100,
    durationMinutes: 180, // 3 hours
    category: 'Treatments',
    basePrice: 100,
    active: true,
    addOns: [
      { name: 'Olaplex Treatment', price: 50 },
      { name: 'Glitter Gloss', price: 30 },
    ],
  },
  {
    id: '6',
    name: 'Butterfly Clip Updo',
    description:
      'An elegant updo perfect for weddings, proms, or any special occasion, adorned with butterfly clips.',
    price: 150,
    durationMinutes: 180, // 3 hours
    category: 'Special Occasions',
    basePrice: 150,
    active: true,
    addOns: [
      { name: 'Hair Extensions', price: 100 },
      { name: 'Flower Crown', price: 50 },
    ],
  },
  {
    id: '7',
    name: 'Pastel Dream Color',
    description:
      'Soft, pastel coloring in the shade of your choice. Consultation required before booking.',
    price: 225,
    durationMinutes: 180, // 3 hours
    category: 'Color Services',
    basePrice: 225,
    active: true,
    addOns: [
      { name: 'Olaplex Treatment', price: 50 },
      { name: 'Glitter Gloss', price: 30 },
    ],
  },
  {
    id: '8',
    name: 'Keratin Revival',
    description:
      'A smoothing keratin treatment to tame frizz and add shine for weeks.',
    price: 150,
    durationMinutes: 180, // 3 hours
    category: 'Treatments',
    basePrice: 150,
    active: true,
    addOns: [
      { name: 'Olaplex Treatment', price: 50 },
      { name: 'Glitter Gloss', price: 30 },
    ],
  },
  {
    id: '9',
    name: 'Basic Trim',
    description:
      'A simple trim to keep your ends healthy and your style fresh.',
    price: 70,
    durationMinutes: 180, // 3 hours
    category: 'Cuts & Styling',
    basePrice: 70,
    active: true,
    addOns: [
      { name: 'Olaplex Treatment', price: 20 },
      { name: 'Glitter Gloss', price: 10 },
    ],
  },
  {
    id: '10',
    name: 'Prom Queen Curls',
    description:
      'Get ready for the big night with glamorous, long-lasting curls.',
    price: 105,
    durationMinutes: 180, // 3 hours
    category: 'Special Occasions',
    basePrice: 105,
    active: true,
    addOns: [
      { name: 'Hair Extensions', price: 50 },
      { name: 'Flower Crown', price: 20 },
    ],
  },
];
