import React from 'react';


const DashboardHome: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
    <div className="space-y-6 animate-fade-in">
        <div>
            <h1 className="text-3xl font-bold font-display text-white">{title}</h1>
            <p className="text-slate-400 mt-2">{desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card p-6 rounded-xl border border-slate-800">
                    <div className="h-10 w-10 rounded-lg bg-slate-800 mb-4 animate-pulse"></div>
                    <div className="h-4 w-2/3 bg-slate-800 rounded mb-2 animate-pulse"></div>
                    <div className="h-3 w-1/2 bg-slate-800 rounded animate-pulse"></div>
                </div>
            ))}
        </div>
    </div>
);

export const CustomerHome = () => <DashboardHome title="My Events" desc="Manage your upcoming events and bookings." />;
export const VendorHome = () => <DashboardHome title="Vendor Portal" desc="Manage your services, availability, and bookings." />;
export const ManagerHome = () => <DashboardHome title="Event Manager" desc="Oversee client projects and tasks." />;
export const AdminHome = () => <DashboardHome title="System Admin" desc="Monitor platform health and users." />;
