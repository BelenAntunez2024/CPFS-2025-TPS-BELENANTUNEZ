import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './producto.entity/producto.entity';
import { Repository } from 'typeorm';
import { ProductoDto } from './dto/producto.dto/producto.dto';

@Injectable()
export class ProductoService {
constructor(
    @InjectRepository(Producto)
    private productoRepository:Repository<Producto>,
){}

async findAll():Promise<Producto[]>{
    return this.productoRepository.find();
}

async findOne(id:number):Promise<Producto | null>{
    return this.productoRepository.findOne({ where: {idProducto:id}
    }
)
}

async remove(id:number){
    try{
    await this.productoRepository.delete(id);
    }catch(e){
        return "no se puede eliminar el producto";
    }
}

async create(dto: ProductoDto): Promise<Producto> {
    const existente = await this.productoRepository.findOne({
        where: { nombre: dto.nombre },
    });
    if (existente) {
        throw new Error("producto ya existe");
    }
    const producto = this.productoRepository.create({
        ...dto,
        idProducto: dto.codigo_producto, // 🔁 Mapeo manual
    });
    return this.productoRepository.save(producto);
}

async update(id: number, productoDto: ProductoDto): Promise<Producto> {
    const productoExistente = await this.productoRepository.findOneBy({ idProducto: id });
    if (!productoExistente) {
    throw new NotFoundException('Producto no encontrado');
  }
  const productoActualizado = this.productoRepository.merge(productoExistente, productoDto);
  return await this.productoRepository.save(productoActualizado);
}


}
