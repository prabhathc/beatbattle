'use client';

import { useState } from 'react';
import { Bell, Shield, User, Wallet, Monitor, Save } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'payments', label: 'Payments', icon: Wallet },
    { id: 'preferences', label: 'Preferences', icon: Monitor },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-gray-400 mt-1">Manage your account preferences</p>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Tabs */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-700">
              <nav className="p-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {activeTab === 'profile' && (
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Display Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                      defaultValue="John Producer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                      defaultValue="Music producer and beat maker..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Website
                    </label>
                    <input
                      type="url"
                      className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                      placeholder="https://your-website.com"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md text-white transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </form>
              )}

              {/* Add other tab contents as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}