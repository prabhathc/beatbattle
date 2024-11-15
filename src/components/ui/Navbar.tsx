'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Music2, TrendingUp, Users, Trophy, Menu, User, Settings, PlusCircle, Bell, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '@/providers/AuthProvider';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading, signIn, signOut } = useAuthContext();

  const menuItems = [
    {
      title: 'Profile',
      icon: User,
      href: '/profile',
    },
    {
      title: 'Create Lobby',
      icon: PlusCircle,
      href: '/create',
      highlight: true,
    },
    {
      title: 'Notifications',
      icon: Bell,
      href: '/notifications',
    },
    {
      title: 'Settings',
      icon: Settings,
      href: '/settings',
    },
  ];

  const handleLogin = async (provider: 'discord' | 'twitch') => {
    try {
      await signIn(provider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsDesktopMenuOpen(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const DesktopMenu = () => (
    <AnimatePresence>
      {isDesktopMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDesktopMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 hidden md:block"
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 h-full w-80 bg-gray-800 border-l border-gray-700 z-50 hidden md:block"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Menu</h2>
                <button
                  onClick={() => setIsDesktopMenuOpen(false)}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {user ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{user.email}</div>
                      <div className="text-sm text-gray-400">Logged in</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {menuItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                          item.highlight
                            ? 'bg-purple-500 hover:bg-purple-600 text-white'
                            : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    ))}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full p-3 text-left text-red-400 hover:text-red-300 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => handleLogin('discord')}
                    className="w-full flex items-center gap-3 p-3 bg-[#5865F2] hover:bg-[#4752C4] rounded-lg text-white transition-colors"
                  >
                    <div className="w-5 h-5">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    </div>
                    Login with Discord
                  </button>

                  <button
                    onClick={() => handleLogin('twitch')}
                    className="w-full flex items-center gap-3 p-3 bg-[#9146FF] hover:bg-[#7B31FF] rounded-lg text-white transition-colors"
                  >
                    <div className="w-5 h-5">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                      </svg>
                    </div>
                    Login with Twitch
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <nav className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <Music2 className="h-8 w-8 text-purple-400" />
                <span className="font-bold text-xl">BeatBattle.gg</span>
              </div>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/active-lobbies"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 hover:text-white transition-colors ${
                    pathname === '/active-lobbies' ? 'bg-purple-800' : ''
                  }`}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Active Lobbies
                </Link>
                {user && (
                  <Link
                    href="/my-battles"
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 hover:text-white transition-colors ${
                      pathname === '/my-battles' ? 'bg-purple-800' : ''
                    }`}
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                    My Lobbies
                  </Link>
                )}
                <Link
                  href="/communities"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 hover:text-white transition-colors"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Communities
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <button
              onClick={() => setIsDesktopMenuOpen(true)}
              className="p-2 hover:bg-purple-800 rounded-md transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-purple-800 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/active-lobbies"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Active Lobbies
            </Link>
            {user && (
              <Link
                href="/my-battles"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800"
              >
                <Trophy className="h-4 w-4 mr-2" />
                My Lobbies
              </Link>
            )}
            <Link
              href="/communities"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800"
            >
              <Users className="h-4 w-4 mr-2" />
              Communities
            </Link>
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  item.highlight
                    ? 'bg-purple-500 hover:bg-purple-600'
                    : 'hover:bg-purple-800'
                }`}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.title}
              </Link>
            ))}
            {!user ? (
              <>
                <button
                  onClick={() => handleLogin('discord')}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded-md text-sm font-medium"
                >
                  Login with Discord
                </button>
                <button
                  onClick={() => handleLogin('twitch')}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-[#9146FF] hover:bg-[#7B31FF] rounded-md text-sm font-medium"
                >
                  Login with Twitch
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 text-red-400 hover:text-red-300 rounded-md text-sm font-medium"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}

      {/* Desktop Slide-out Menu */}
      <DesktopMenu />
    </nav>
  );
}