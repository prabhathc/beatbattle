export interface Track {
  id: string;
  title: string;
  artist: string;
  artwork?: string;
  isPrioritized: boolean;
  submittedAt: string;
  audioUrl: string;
}