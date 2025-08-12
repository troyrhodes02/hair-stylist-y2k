export interface Service {
  id: string;
  name: string;
  description: string;
  deposit: number;
  category:
    | 'Cuts & Styling'
    | 'Color Services'
    | 'Treatments'
    | 'Special Occasions';
  duration: number; // in minutes
  active: boolean;
  imageUrl: string;
}
