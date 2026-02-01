import { create } from 'zustand';
import type { Vendor, EventDraft } from '../types/marketplace';

interface MarketplaceState {
    vendors: Vendor[];
    searchQuery: string;
    selectedCategory: string | 'ALL';
    draftEvent: EventDraft | null;

    // Actions
    setSearchQuery: (query: string) => void;
    setCategory: (category: string) => void;
    startDraftEvent: (details: Partial<EventDraft>) => void;
    addToEvent: (vendorId: string, serviceId: string) => void;
    deleteDraftEvent: () => void;
}

// Mock Data
const MOCK_VENDORS: Vendor[] = [
    {
        id: 'v1',
        name: 'Grand Royal Palace',
        category: 'VENUE',
        description: 'A luxurious heritage venue perfect for royal weddings.',
        location: 'Udaipur, Rajasthan',
        rating: 4.9,
        reviewCount: 128,
        minPrice: 500000,
        imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80',
        services: [
            { id: 's1', name: 'Grand Hall Rental', description: 'Full day access to main hall', price: 500000, unit: 'per_day' },
        ]
    },
    {
        id: 'v2',
        name: 'Lens & Light Studios',
        category: 'PHOTOGRAPHY',
        description: 'Cinematic wedding photography and videography.',
        location: 'Mumbai, Maharashtra',
        rating: 4.7,
        reviewCount: 85,
        minPrice: 50000,
        imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80',
        services: [
            { id: 's2', name: 'Wedding Package', description: 'Photo + Video coverage', price: 75000, unit: 'per_day' },
        ]
    },
    {
        id: 'v3',
        name: 'Delight Catering',
        category: 'CATERING',
        description: 'Exquisite multi-cuisine catering services.',
        location: 'Bangalore, Karnataka',
        rating: 4.5,
        reviewCount: 200,
        minPrice: 800,
        imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80',
        services: [
            { id: 's3', name: 'Gold Buffet', description: 'Premium spread with live counters', price: 1200, unit: 'per_plate' },
        ]
    }
];

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
    vendors: MOCK_VENDORS,
    searchQuery: '',
    selectedCategory: 'ALL',
    draftEvent: null,

    setSearchQuery: (q) => set({ searchQuery: q }),
    setCategory: (c) => set({ selectedCategory: c }),

    startDraftEvent: (details) => set({
        draftEvent: {
            id: Math.random().toString(36).substr(2, 9),
            type: 'Wedding',
            date: null,
            guestCount: 0,
            budget: 0,
            selectedServices: [],
            ...details
        } as EventDraft
    }),

    addToEvent: (vendorId, serviceId) => set((state) => {
        if (!state.draftEvent) return state;
        return {
            draftEvent: {
                ...state.draftEvent,
                selectedServices: [
                    ...state.draftEvent.selectedServices,
                    { vendorId, serviceId, quantity: 1 }
                ]
            }
        };
    }),

    deleteDraftEvent: () => set({ draftEvent: null })
}));
