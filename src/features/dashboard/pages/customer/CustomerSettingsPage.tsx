import React, { useState } from 'react';
import { useAuthStore } from '../../../../store/authStore';
import { User, Bell, Shield, Moon, ArrowRight } from 'lucide-react';

export const CustomerSettingsPage: React.FC = () => {
    const { user } = useAuthStore();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(true);
    const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

    if (!user) return null;

    const handleChangePassword = () => {
        // In a real app, this would open a modal or navigate to a form
        alert('Password change functionality would open here.');
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            alert('Account deletion request sent to admin.');
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-4xl">
            <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Settings</h1>

            {/* Profile Section */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-colors">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Profile Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-slate-500 dark:text-slate-400 mb-2">Full Name</label>
                        <input
                            type="text"
                            value={user.name}
                            readOnly
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-slate-300 focus:outline-none cursor-not-allowed opacity-75"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-500 dark:text-slate-400 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-slate-300 focus:outline-none cursor-not-allowed opacity-75"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-500 dark:text-slate-400 mb-2">Account Role</label>
                        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-slate-900 dark:text-slate-300 capitalize flex items-center justify-between">
                            <span>{user.role.toLowerCase()}</span>
                            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase font-bold">Active</span>
                        </div>
                    </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                    <button className="text-sm text-primary hover:text-primary-light hover:underline flex items-center gap-1">
                        Edit Profile <ArrowRight className="h-3 w-3" />
                    </button>
                </div>
            </section>

            {/* Notifications Section */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-colors">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notifications
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/50 rounded-lg">
                        <div>
                            <p className="font-medium text-slate-900 dark:text-white">Push Notifications</p>
                            <p className="text-sm text-slate-500">Receive alerts for new messages and updates</p>
                        </div>
                        <button
                            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${notificationsEnabled ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
                        >
                            <span className={`absolute top-1 left-1 h-4 w-4 bg-white rounded-full transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/50 rounded-lg">
                        <div>
                            <p className="font-medium text-slate-900 dark:text-white">Email Updates</p>
                            <p className="text-sm text-slate-500">Get weekly summaries and promotional offers</p>
                        </div>
                        <button
                            onClick={() => setEmailUpdates(!emailUpdates)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${emailUpdates ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
                        >
                            <span className={`absolute top-1 left-1 h-4 w-4 bg-white rounded-full transition-transform ${emailUpdates ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Appearance Section */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-colors">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Moon className="h-5 w-5 text-primary" />
                    Appearance
                </h2>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/50 rounded-lg">
                    <div>
                        <p className="font-medium text-slate-900 dark:text-white">Dark Mode</p>
                        <p className="text-sm text-slate-500">Toggle website theme preference</p>
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                        <span className={`absolute top-1 left-1 h-4 w-4 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>
            </section>

            {/* Security Section */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-colors">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Security
                </h2>
                <button
                    onClick={handleChangePassword}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-primary/50 text-slate-700 dark:text-slate-300 py-3 rounded-lg transition-all flex items-center justify-between px-4 group"
                >
                    <span>Change Password</span>
                    <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-primary transition-colors" />
                </button>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                        onClick={handleDeleteAccount}
                        className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors"
                    >
                        Delete Account
                    </button>
                </div>
            </section>
        </div>
    );
};
