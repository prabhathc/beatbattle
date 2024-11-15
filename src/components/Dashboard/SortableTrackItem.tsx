'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Play, Pause, Music2, Clock, MoreVertical, GripVertical } from 'lucide-react';
import Image from 'next/image';
import { Track } from '@/types/track';

interface SortableTrackItemProps {
  track: Track;
  currentTrack: string | null;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

export function SortableTrackItem({
  track,
  currentTrack,
  isPlaying,
  onPlay,
  onPause,
}: SortableTrackItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: track.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-gray-700/50 rounded-lg p-4 ${
        currentTrack === track.id ? 'border-2 border-purple-500' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <button
          className="touch-none"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4 text-gray-400 hover:text-gray-300 cursor-grab active:cursor-grabbing" />
        </button>

        <div className="relative w-16 h-16 flex-shrink-0">
          {track.artwork ? (
            <Image
              src={track.artwork}
              alt={track.title}
              fill
              className="object-cover rounded-md"
            />
          ) : (
            <div className="w-full h-full bg-gray-600 rounded-md flex items-center justify-center">
              <Music2 className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <button
            onClick={() => {
              if (currentTrack === track.id && isPlaying) {
                onPause();
              } else {
                onPlay();
              }
            }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md opacity-0 hover:opacity-100 transition-opacity"
          >
            {currentTrack === track.id && isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white" />
            )}
          </button>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-white font-medium truncate">{track.title}</h3>
              <p className="text-gray-400 text-sm">{track.artist}</p>
            </div>
            <div className="flex items-center gap-2">
              {track.isPrioritized && (
                <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded-full border border-yellow-500/50">
                  Priority
                </span>
              )}
              <button className="p-1 hover:bg-gray-600 rounded-full transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {track.submittedAt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}