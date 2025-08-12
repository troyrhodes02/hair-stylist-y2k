interface AddOn {
  name: string;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  basePrice: number;
  durationMinutes: number;
  category:
    | 'Locs'
    | 'Cuts & Styling'
    | 'Color Services'
    | 'Treatments'
    | 'Special Occasions';
  addOns: AddOn[];
  active?: boolean;
  imageUrl?: string;
}
