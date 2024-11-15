'use client';

import { useState } from 'react';
import { Trophy, MessageSquare, Star, Calendar, Bell, Check } from 'lucide-react';
import Image from 'next/image';

type NotificationType = 'all' | 'battles' | 'feedback' | 'mentions';

interface Notification {
  id: string;
  type: 'battle' | 'feedback' | 'mention';
  title: string;
  description: string;
  time: string;
  read: boolean;
  image?: string;
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<NotificationType>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'battle',
      title: 'Battle Results',
      description: 'You won 1st place in Summer Beat Championship!',
      time: '2 hours ago',
      read: false,
      image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89',
    },
    {
      id: '2',
      type: 'feedback',
      title: 'New Feedback',
      description: 'ProducerX left feedback on your track "Midnight Vibes"',
      time: '5 hours ago',
      read: true,
    },
    {
      id: '3',
      type: 'mention',
      title: 'Mentioned You',
      description: 'BeatMaker99 mentioned you in a comment',
      time: '1 day ago',
      read: false,
    },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'battle':
        return Trophy;
      case 'feedback':
        return MessageSquare;
      case 'mention':
        return Star;
      default:
        return Bell;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = notifications.filter(n => 
    filter === 'all' ? true : n.type === filter
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Notifications</h1>
              <p className="text-gray-400 mt-1">Stay updated with your activity</p>
            </div>
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md text-white transition-colors"
            >
              <Check className="w-4 h-4" />
              Mark all as read
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'all', label: 'All' },
              { id: 'battles', label: 'Battles' },
              { id: 'feedback', label: 'Feedback' },
              { id: 'mentions', label: 'Mentions' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as NotificationType)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === tab.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredNotifications.map((notification) => {
              const Icon = getIcon(notification.type);
              
              return (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
                    notification.read ? 'bg-gray-700/30' : 'bg-gray-700/50'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    notification.read ? 'bg-gray-600' : 'bg-purple-500'
                  }`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium">{notification.title}</h3>
                      {!notification.read && (
                        <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 mt-1">{notification.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{notification.time}</span>
                    </div>
                  </div>

                  {notification.image && (
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={notification.image}
                        alt="Notification"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}