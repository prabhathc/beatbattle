'use client';

import { useState } from 'react';
import { Play, Pause, SkipForward, Music2, Clock, Star, MoreVertical, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Track } from '@/types/track';
import { SortableTrackItem } from './SortableTrackItem';

interface FeedbackQueueProps {
  lobbyId: string;
}

export default function FeedbackQueue({ lobbyId }: FeedbackQueueProps) {
  const router = useRouter();
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: '1',
      title: 'Summer Vibes',
      artist: 'Producer123',
      artwork: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89',
      isPrioritized: true,
      submittedAt: '5m ago',
      audioUrl: '/demo.mp3',
    },
    {
      id: '2',
      title: 'Late Night Beat',
      artist: 'BeatMaker99',
      isPrioritized: true,
      submittedAt: '10m ago',
      audioUrl: '/demo2.mp3',
    },
    {
      id: '3',
      title: 'Chill Waves',
      artist: 'WaveMaker',
      isPrioritized: false,
      submittedAt: '15m ago',
      audioUrl: '/demo3.mp3',
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const prioritizedTracks = tracks.filter(track => track.isPrioritized);
  const regularTracks = tracks.filter(track => !track.isPrioritized);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setTracks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        // Check if moving from regular to priority queue
        const isMovingToPriority = 
          !items[oldIndex].isPrioritized && 
          items[newIndex].isPrioritized;
        
        if (isMovingToPriority) {
          const updatedItems = [...items];
          updatedItems[oldIndex] = {
            ...updatedItems[oldIndex],
            isPrioritized: true,
          };
          return arrayMove(updatedItems, oldIndex, newIndex);
        }
        
        // If moving within the same queue
        if (items[oldIndex].isPrioritized === items[newIndex].isPrioritized) {
          return arrayMove(items, oldIndex, newIndex);
        }
        
        // Don't allow moving from priority to regular
        return items;
      });
    }
    
    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Feedback Queue</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push(`/dashboard/${lobbyId}/stream-view`)}
            className="flex items-center px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-white text-sm transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Stream View
          </button>
          <button
            onClick={() => {
              setCurrentTrack(null);
              setIsPlaying(false);
            }}
            className="flex items-center px-3 py-1.5 bg-purple-500 hover:bg-purple-600 rounded-md text-white text-sm transition-colors"
          >
            <SkipForward className="w-4 h-4 mr-1" />
            Next Track
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        modifiers={[restrictToVerticalAxis]}
      >
        <div className="space-y-6">
          {prioritizedTracks.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400 flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-400" />
                Priority Queue
              </h3>
              <SortableContext
                items={prioritizedTracks.map(t => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {prioritizedTracks.map(track => (
                    <SortableTrackItem
                      key={track.id}
                      track={track}
                      currentTrack={currentTrack}
                      isPlaying={isPlaying}
                      onPlay={() => {
                        setCurrentTrack(track.id);
                        setIsPlaying(true);
                      }}
                      onPause={() => setIsPlaying(false)}
                    />
                  ))}
                </div>
              </SortableContext>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400">Regular Queue</h3>
            <SortableContext
              items={regularTracks.map(t => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {regularTracks.map(track => (
                  <SortableTrackItem
                    key={track.id}
                    track={track}
                    currentTrack={currentTrack}
                    isPlaying={isPlaying}
                    onPlay={() => {
                      setCurrentTrack(track.id);
                      setIsPlaying(true);
                    }}
                    onPause={() => setIsPlaying(false)}
                  />
                ))}
              </div>
            </SortableContext>
          </div>
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="bg-gray-700 rounded-lg p-4 shadow-lg opacity-90">
              {tracks.find(t => t.id === activeId)?.title}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}