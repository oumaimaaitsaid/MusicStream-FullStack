import { Pipe, PipeTransform } from '@angular/core';
import { Track } from '../../core/models/track.model';

@Pipe({
  name: 'filterTracks',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(tracks: Track[], searchTerm: string, category: string): Track[] {
    if (!tracks) return [];

    return tracks.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            t.artist.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || t.category === category;
      return matchesSearch && matchesCategory;
    });
  }
}
