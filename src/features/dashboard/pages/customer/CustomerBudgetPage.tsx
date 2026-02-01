import { useMarketplaceStore } from '../../../../store/marketplaceStore';
import { TrendingUp, DollarSign, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CustomerBudgetPage: React.FC = () => {
    const { draftEvent, vendors } = useMarketplaceStore();

    if (!draftEvent) {
        return (
            <div className="text-center py-20 animate-fade-in">
                <div className="bg-slate-900/50 p-6 rounded-2xl inline-block mb-4">
                    <DollarSign className="h-12 w-12 text-slate-500" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">No Active Budget</h2>
                <p className="text-slate-400 mb-6">Create an event to start tracking your budget.</p>
                <Link
                    to="/dashboard/customer"
                    className="text-primary hover:underline"
                >
                    Go to Overview
                </Link>
            </div>
        );
    }

    // Calculate total spent
    const totalSpent = draftEvent.selectedServices.reduce((acc, item) => {
        const vendor = vendors.find(v => v.id === item.vendorId);
        const service = vendor?.services.find(s => s.id === item.serviceId);
        return acc + (service?.price || 0) * item.quantity;
    }, 0);

    const budget = draftEvent.budget || 0;
    const remaining = budget - totalSpent;
    const percentageSpent = budget > 0 ? (totalSpent / budget) * 100 : 0;
    const isOverBudget = totalSpent > budget;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold font-display text-white">Budget Tracker</h1>
                <div className="text-right">
                    <p className="text-slate-400 text-sm">Total Budget</p>
                    <p className="text-2xl font-bold text-white">₹{budget.toLocaleString()}</p>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Total Spent</p>
                            <p className="text-2xl font-bold text-white">₹{totalSpent.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${isOverBudget ? 'bg-red-500' : 'bg-blue-500'}`}
                            style={{ width: `${Math.min(percentageSpent, 100)}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-right">{percentageSpent.toFixed(1)}% Used</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${isOverBudget ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
                            <DollarSign className={`h-6 w-6 ${isOverBudget ? 'text-red-500' : 'text-emerald-500'}`} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Remaining</p>
                            <p className={`text-2xl font-bold ${remaining < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                                {remaining < 0 ? '-' : ''}₹{Math.abs(remaining).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-800 mb-2">
                            <span className="text-xl font-bold text-slate-300">{draftEvent.selectedServices.length}</span>
                        </div>
                        <p className="text-slate-400 text-sm">Booked Services</p>
                    </div>
                </div>
            </div>

            {/* Expense Breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold text-white">Expense Breakdown</h3>
                    {isOverBudget && (
                        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 px-3 py-1 rounded-full">
                            <AlertCircle className="h-4 w-4" />
                            <span>Over Budget</span>
                        </div>
                    )}
                </div>

                {draftEvent.selectedServices.length === 0 ? (
                    <div className="p-10 text-center text-slate-500">
                        <p>No expenses recorded yet.</p>
                        <Link to="/marketplace" className="text-primary hover:underline text-sm mt-2 inline-block">
                            Browse Services
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-800">
                        {draftEvent.selectedServices.map((item, index) => {
                            const vendor = vendors.find(v => v.id === item.vendorId);
                            const service = vendor?.services.find(s => s.id === item.serviceId);
                            const cost = (service?.price || 0) * item.quantity;

                            return (
                                <div key={index} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 font-bold">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{service?.name || 'Unknown Service'}</p>
                                            <p className="text-sm text-slate-500">{vendor?.name}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-white">₹{cost.toLocaleString()}</p>
                                        <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
