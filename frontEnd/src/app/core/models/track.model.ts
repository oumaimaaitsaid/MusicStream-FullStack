export interface Track {
  id: string;
  title: string;
  artist: string;
  description?: string;
  addedDate: Date;
  duration: string;
  category: 'pop' | 'rock' | 'rap' | 'jazz';
  audioData?: string;
  blob: Blob;
}
