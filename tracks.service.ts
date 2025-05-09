import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TracksService {
   /* async buscarPorParams(pGenero: string) {
        let resp = await fetch ('http://localhost:3001/tracks/');
        let datos = await resp.json();
        let result: any = [];
        for (let i = 0; i <datos.length; i++) {
            const track = datos[i];
            if(track.genero.toLowerCase() === pGenero.toLocaleLowerCase()){   }
               result.push(track);
     }     
    }*/
 

    private baseUrl = 'http://localhost:3001/tracks/';

    async getAll(){
        try{                   
            const response = await fetch(this.baseUrl);

            if(!response.ok){ 
                throw new NotFoundException('No se encontraron tracks en esa url');       
       
        } 
            return await response.json();
        } catch(error){
            throw new HttpException("Error en getAll" + error.mensage, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    async getOne(id:string){
        try{
           const response = await fetch (`${this.baseUrl}/${id}`);
           if (!response.ok) {
            throw new NotFoundException(`No se encontró el track con id ${id}`);
        }
          return await response.json();
          
        } catch(error){
            throw new HttpException('Error en getOne:' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } 
    

    async create(track:any){
        try {
        const response = await fetch(this.baseUrl,
            {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(track)
            });
        if(!response.ok){ 
            throw new BadRequestException('Datos Invalidos para crear el track');
        }
        return await response.json();
      }catch(error){
        throw new HttpException('Error en create:' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    async update(id: number, body: any) {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new NotFoundException(`No se pudo actualizar el track con id ${id}`);
            }

            return;
        } catch (error) {
            throw new HttpException('Error en update: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new NotFoundException(`No se pudo eliminar el track con id ${id}`);
            }

            return;
        } catch (error) {
            throw new HttpException('Error en delete: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
