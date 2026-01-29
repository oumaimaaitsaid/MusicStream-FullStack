import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AudioPlayerService } from '../../../core/services/audio-player.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent {

  public player = inject(AudioPlayerService);


  onSeek(event: any) {
    const time = event.target.value;
    this.player.seekTo(time);
  }

  onVolumeChange(event: any) {
    const volume = event.target.value;
    this.player.setVolume(volume);
  }
}
