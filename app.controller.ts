import { Controller, Get,  Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("AYACUCHO")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("tracks")
  getAllTracks() {
    return this.appService.getAllTracks();
  }

  @Get("tracks/:id")
  getTrackById(@Param('id') id: string) {
    return this.appService.getTrackById(id);
  }

  @Post("crear")
  createTrack(@Body() body:any) {
    return this.appService.createTrack(body);
  }

 @Put(':id')
  updateTrackById(@Param('id') id: number, @Body() body): Promise<any>{
    return this.appService.updateTrackById(+id, body);
  }

  @Delete("eliminar/id")
  deleteTrack(@Param('id') id: string) {
    return this.appService.deleteTrack(+id);
  }
}  

