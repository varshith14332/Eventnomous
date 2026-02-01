export type VendorCategory = 'VENUE' | 'CATERING' | 'PHOTOGRAPHY' | 'DECOR' | 'ENTERTAINMENT' | 'MAKEUP' | 'TRANSPORT';

export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    unit: 'per_hour' | 'per_day' | 'per_plate' | 'flat';
}

export interface Vendor {
    id: string;
    name: string;
    category: VendorCategory;
    description: string;
    location: string;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    services: Service[];
    minPrice: number;
}

export interface EventDraft {
    id: string;
    type: string;
    date: string | null;
    guestCount: number;
    budget: number;
    selectedServices: {
        vendorId: string;
        serviceId: string;
        quantity: number;
    }[];
}
