import { Body, Injectable } from '@nestjs/common';
import { METHODS } from 'http';
import { AppController } from './app.controller';

@Injectable()
export class AppService {

    private tracks = [
      { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', year: 1975 },
      { id: 2, title: 'Imagine', artist: 'John Lennon', album: 'Imagine', year: 1971 },
      { id: 3, title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', year: 1976 },
      { id: 4, title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', year: 1982 },
      { id: 5, title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', year: 1991 },
    ];
  
    async getAllTracks() {
      return this.tracks;
    }
  
    async getTrackById(id: string) {
      for (let i = 0; i < this.tracks.length; i++) {
        if (this.tracks[i].id === parseInt(id)) {
          return this.tracks[i];
        }
      }
      return null;
    }

  
    async createTrack(track:any) {
      let newTrack = { 
        id: track.id, 
        title: track.title, 
        artist: track.artist,
        album: track.album, 
        year: track.year,
      }
      this.tracks.push(newTrack);
      return "Se creo el track con exito";
    }
  
    async updateTrackById(id: number, body: any) {
      for (let i = 0; i < this.tracks.length; i++) {
        if (this.tracks[i].id === id) {
          this.tracks[i].title = body.title;
          this.tracks[i].artist = body.artist;
          return "Se actualizó el track con éxito";
        }
      }
      return "No se encontró el track para actualizar";
    }
  
    async deleteTrack(id: number){
      for (let i = 0; i<this.tracks.length; i++){ 
       if (this.tracks[i].id === id){
       this.tracks.splice(i, 1);
          return "Se elimino el track con exito"
      
       }
    }
  }
}