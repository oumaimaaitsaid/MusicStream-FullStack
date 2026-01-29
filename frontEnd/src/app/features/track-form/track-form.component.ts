import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TrackService } from '../../core/services/track.service';
import { Track } from '../../core/models/track.model';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './track-form.component.html',
  styleUrl: './track-form.component.css'
})
export class TrackFormComponent {
  private fb = inject(FormBuilder);
  private trackService = inject(TrackService);

  selectedFile: File | null = null;
  errorMsg = signal<string | null>(null);

  musicForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    artist: ['', [Validators.required]],
    category: ['pop', Validators.required],
    description: ['', [Validators.maxLength(200)]]
  });

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        this.errorMsg.set("Fichier trop grand! (Max 10MB)");
        this.selectedFile = null;
      } else {
        this.errorMsg.set(null);
        this.selectedFile = file;
      }
    }
  }
 private getAudioDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.src = URL.createObjectURL(file);
    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(audio.src);
      resolve(Math.floor(audio.duration));
    };
  });
}
  async onSubmit() {
    if (this.musicForm.valid && this.selectedFile) {
      const durationInSeconds = await this.getAudioDuration(this.selectedFile);

      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = durationInSeconds % 60;
      const durationStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;

      const newTrack: Track = {
        id: crypto.randomUUID(),
        title: this.musicForm.value.title!,
        artist: this.musicForm.value.artist!,
        category: this.musicForm.value.category as any,
        description: this.musicForm.value.description || '',
        addedDate: new Date(),
        duration: durationStr,
        blob: this.selectedFile
      };

      await this.trackService.addTrack(newTrack);
      alert("Musique ajoutée avec succès !");
      this.musicForm.reset();
      this.selectedFile = null;
    }
  }
}
