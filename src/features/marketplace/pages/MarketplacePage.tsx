import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useMarketplaceStore } from '../../../store/marketplaceStore';
import { VendorCard } from '../components/VendorCard';
import type { VendorCategory } from '../../../types/marketplace';

const CATEGORIES: { id: VendorCategory | 'ALL'; label: string }[] = [
    { id: 'ALL', label: 'All Vendors' },
    { id: 'VENUE', label: 'Venues' },
    { id: 'PHOTOGRAPHY', label: 'Photography' },
    { id: 'CATERING', label: 'Catering' },
    { id: 'DECOR', label: 'Decoration' },
    { id: 'ENTERTAINMENT', label: 'Entertainment' },
];

export const MarketplacePage: React.FC = () => {
    const { vendors, searchQuery, selectedCategory, setSearchQuery, setCategory } = useMarketplaceStore();
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Derived state (Filter logic mocked for now)
    const filteredVendors = vendors.filter(v => {
        const matchesCategory = selectedCategory === 'ALL' || v.category === selectedCategory;
        const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-950 p-6 lg:p-10 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display text-white">Marketplace</h1>
                    <p className="text-slate-400">Discover the best vendors for your event.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search vendors, venues..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>
                    <button
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white md:hidden"
                    >
                        <SlidersHorizontal className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 hidden lg:block">
                    <div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Categories</h3>
                        <div className="space-y-1">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setCategory(cat.id as string)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat.id
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range Placeholder */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Price Range</h3>
                        <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                            <div className="h-full w-1/2 bg-slate-700"></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mt-2">
                            <span>₹1k</span>
                            <span>₹10L+</span>
                        </div>
                    </div>
                </aside>

                {/* Vendors Grid */}
                <div className="flex-1">
                    {filteredVendors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredVendors.map(vendor => (
                                <VendorCard
                                    key={vendor.id}
                                    vendor={vendor}
                                    onClick={() => console.log('View', vendor.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="inline-flex p-4 rounded-full bg-slate-900 mb-4">
                                <Search className="h-8 w-8 text-slate-600" />
                            </div>
                            <h3 className="text-xl font-bold text-white">No vendors found</h3>
                            <p className="text-slate-500">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
