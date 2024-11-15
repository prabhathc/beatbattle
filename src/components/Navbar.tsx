import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Music2, TrendingUp, Users, Trophy, Menu, LogIn } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoading } = useUser();

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
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {!isLoading && (
                user ? (
                  <>
                    <div className="flex items-center space-x-2">
                      {user.picture && (
                        <img
                          src={user.picture}
                          alt={user.name || 'User'}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <span className="text-sm font-medium">{user.name}</span>
                    </div>
                    <Link
                      href="/api/auth/logout"
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      Logout
                    </Link>
                    <Link
                      href="/create"
                      className={`bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname === '/create' ? 'bg-purple-600' : ''
                      }`}
                    >
                      Create Lobby
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/api/auth/login"
                    className="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md text-sm font-medium transition-colors"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login with Discord/Twitch
                  </Link>
                )
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-purple-800 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
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
            {!isLoading && (
              user ? (
                <>
                  <div className="flex items-center px-3 py-2">
                    {user.picture && (
                      <img
                        src={user.picture}
                        alt={user.name || 'User'}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <Link
                    href="/api/auth/logout"
                    className="block px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    Logout
                  </Link>
                  <Link
                    href="/create"
                    className="block px-3 py-2 rounded-md text-sm font-medium bg-purple-500 hover:bg-purple-600"
                  >
                    Create Lobby
                  </Link>
                </>
              ) : (
                <Link
                  href="/api/auth/login"
                  className="flex items-center px-3 py-2 bg-purple-500 hover:bg-purple-600 rounded-md text-sm font-medium"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login with Discord/Twitch
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}