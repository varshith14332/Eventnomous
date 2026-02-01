import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { NAV_CONFIG } from '../lib/navigation';
import { LogOut, Menu, Bell, User, Sparkles } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { UserRole } from '../../../types/auth';

export const DashboardLayout: React.FC = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);

    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Welcome to Eventnomous! 🎉', desc: 'Get started by creating your first event.', time: 'Just now', read: false, link: '/dashboard/customer/events' },
        { id: 2, title: 'Profile Update', desc: 'Please complete your profile details.', time: '2 min ago', read: false, link: '/dashboard/customer/settings' }
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        alert('All notifications marked as read!');
    };

    const handleNotificationClick = (link: string) => {
        setNotificationsOpen(false);
        navigate(link);
    };

    if (!user) return null;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = NAV_CONFIG[user.role as UserRole] || [];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors duration-300">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
                    !isSidebarOpen && "-translate-x-full lg:hidden" // Hide on desktop if toggled closed (optional UX)
                )}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-200 dark:border-slate-800">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white">Eventnomous</span>
                    </div>

                    {/* Nav Items */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        <div className="mb-4 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            {user.role} Dashboard
                        </div>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary/10 text-primary"
                                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                    {item.title}
                                </NavLink>
                            );
                        })}
                    </nav>

                    {/* User Profile Footer */}
                    <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-xs font-bold text-white">
                                {user.name.charAt(0)}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium truncate text-slate-900 dark:text-white">{user.name}</p>
                                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-2 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-lg transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-16 bg-white/75 dark:bg-slate-900/50 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setUserMenuOpen(false);
                                    setNotificationsOpen(!isNotificationsOpen);
                                }}
                                className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative transition-colors focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800"
                            >
                                <Bell className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                                )}
                            </button>

                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 animate-fade-in origin-top-right">
                                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                                        <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={markAllRead}
                                                className="text-xs text-primary cursor-pointer hover:underline bg-transparent border-none p-0 focus:outline-none"
                                            >
                                                Mark all read
                                            </button>
                                        )}
                                    </div>
                                    <div className="max-h-80 overflow-y-auto">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                onClick={() => handleNotificationClick(notification.link)}
                                                className={cn(
                                                    "p-4 border-b border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer",
                                                    !notification.read && "bg-slate-50 dark:bg-slate-800/20"
                                                )}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <p className={cn("text-sm font-medium", notification.read ? "text-slate-500 dark:text-slate-400" : "text-slate-900 dark:text-white")}>
                                                        {notification.title}
                                                    </p>
                                                    {!notification.read && (
                                                        <span className="h-1.5 w-1.5 bg-primary rounded-full mt-1.5"></span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-500 mt-1">{notification.desc}</p>
                                                <p className="text-[10px] text-slate-600 mt-2">{notification.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-slate-950/50 rounded-b-xl text-center">
                                        <button
                                            onClick={() => {
                                                setNotificationsOpen(false);
                                                alert('Notifications page coming soon!');
                                            }}
                                            className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none"
                                        >
                                            View all notifications
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setNotificationsOpen(false);
                                    setUserMenuOpen(!isUserMenuOpen);
                                }}
                                className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <User className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 animate-fade-in origin-top-right">
                                    <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                    </div>
                                    <div className="p-2">
                                        <button
                                            onClick={() => navigate(`/dashboard/${user.role.toLowerCase()}/settings`)}
                                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-left"
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Settings
                                        </button>
                                        <div className="h-px bg-slate-200 dark:bg-slate-800 my-1"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-lg transition-colors text-left"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>

    )
}
