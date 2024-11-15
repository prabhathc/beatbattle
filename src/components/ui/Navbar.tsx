'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Music2, 
  TrendingUp, 
  Users, 
  Trophy, 
  Menu,
  User,
  Settings,
  PlusCircle,
  Bell,
  X,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const pathname = usePathname();

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
                <Link
                  href="/my-battles"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 hover:text-white transition-colors ${
                    pathname === '/my-battles' ? 'bg-purple-800' : ''
                  }`}
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  My Lobbies
                </Link>
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
            <div className="ml-4 flex items-center md:ml-6">
              <button
                onClick={() => setIsDesktopMenuOpen(true)}
                className="p-2 hover:bg-purple-800 rounded-md transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
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
            <Link
              href="/my-battles"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800"
            >
              <Trophy className="h-4 w-4 mr-2" />
              My Lobbies
            </Link>
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
          </div>
        </div>
      )}

      {/* Desktop Slide-out Menu */}
      <DesktopMenu />
    </nav>
  );
}