'use client';

import { useState } from 'react';
import { Play, Pause, Music2, Clock, Star, MoreVertical, GripVertical } from 'lucide-react';
import Image from 'next/image';
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

interface BattleSubmissionQueueProps {
  battleId: string;
}

export default function BattleSubmissionQueue({ battleId }: BattleSubmissionQueueProps) {
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
      isPrioritized: false,
      submittedAt: '10m ago',
      audioUrl: '/demo2.mp3',
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      setTracks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    
    setActiveId(null);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Submission Queue</h2>
        <div className="flex items-center gap-4">
          <select className="bg-gray-700 text-white rounded-md px-3 py-1.5 text-sm">
            <option>All Submissions</option>
            <option>Featured</option>
            <option>Regular</option>
          </select>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={tracks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {tracks.map((track) => (
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