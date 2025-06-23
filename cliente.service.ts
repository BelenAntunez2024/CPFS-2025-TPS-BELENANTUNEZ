import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteEnt } from './entities/cliente.entity';
import { ClienteDto } from './dto/cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEnt)
    private readonly clienteRepository: Repository<ClienteEnt>,
  ) {}
  
    async findAll():Promise<ClienteDto[]> {
     return this.clienteRepository.find();
  }
  
    async findOne(id: number):Promise<ClienteDto | null> {
     return this.clienteRepository.findOne({where: { id }});
  }

    async remove(id: number) {
    return this.clienteRepository.delete(id);
  }

  async create(clienteDto: ClienteDto) : Promise<ClienteDto> {
    let nuevoCliente = this.clienteRepository.save(clienteDto);
    return nuevoCliente;   
  }

  async update(id: number, clienteDto: ClienteDto) {
    let nuevoCliente = await this.clienteRepository.findOneBy({id});
    if(!nuevoCliente){
      throw new NotFoundException("Cliente No existe");
    }
    let clienteActualizado = this.clienteRepository.merge(nuevoCliente,clienteDto);
    return this.clienteRepository.save(clienteActualizado);
  }
}
