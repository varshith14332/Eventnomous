import type { UserRole } from '../../../types/auth';
import { LayoutDashboard, Calendar, ShoppingBag, Users, Settings, CreditCard, ClipboardList, Briefcase } from 'lucide-react';

export interface NavItem {
    title: string;
    path: string;
    icon: any;
}

export const NAV_CONFIG: Record<UserRole, NavItem[]> = {
    CUSTOMER: [
        { title: 'Overview', path: '/dashboard/customer', icon: LayoutDashboard },
        { title: 'My Events', path: '/dashboard/customer/events', icon: Calendar },
        { title: 'Budget', path: '/dashboard/customer/budget', icon: CreditCard },
        { title: 'Vendors', path: '/marketplace', icon: ShoppingBag },
        { title: 'Settings', path: '/dashboard/customer/settings', icon: Settings },
    ],
    MANAGER: [
        { title: 'Overview', path: '/dashboard/manager', icon: LayoutDashboard },
        { title: 'Kanban Board', path: '/dashboard/manager/kanban', icon: ClipboardList },
        { title: 'Clients', path: '/dashboard/manager/clients', icon: Users },
        { title: 'Calendar', path: '/dashboard/manager/calendar', icon: Calendar },
        { title: 'Finances', path: '/dashboard/manager/finances', icon: CreditCard },
    ],
    VENDOR: [
        { title: 'Overview', path: '/dashboard/vendor', icon: LayoutDashboard },
        { title: 'Services', path: '/dashboard/vendor/services', icon: Briefcase },
        { title: 'Bookings', path: '/dashboard/vendor/bookings', icon: ClipboardList },
        { title: 'Availability', path: '/dashboard/vendor/calendar', icon: Calendar },
        { title: 'Payments', path: '/dashboard/vendor/payments', icon: CreditCard },
    ],
    ADMIN: [
        { title: 'Overview', path: '/dashboard/admin', icon: LayoutDashboard },
        { title: 'Users', path: '/dashboard/admin/users', icon: Users },
        { title: 'Vendors', path: '/dashboard/admin/vendors', icon: Store },
        { title: 'Reports', path: '/dashboard/admin/reports', icon: ClipboardList },
        { title: 'Settings', path: '/dashboard/admin/settings', icon: Settings },
    ],
};

import { Store } from 'lucide-react';
