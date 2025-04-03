db.computadoras.insertMany([
  { nombre: "Laptop HP Pavilion", marca: "HP", precio: 900, stock: 120 },
  { nombre: "Laptop Dell Inspiron", marca: "Dell", precio: 850, stock: 80 },
  { nombre: "Mouse Logitech MX", marca: "Logitech", precio: 50, stock: 200 },
  { nombre: "Teclado Razer BlackWidow", marca: "Razer", precio: 150, stock: 60 },
  { nombre: "Monitor Samsung 24\"", marca: "Samsung", precio: 200, stock: 90 },
  { nombre: "Laptop Asus VivoBook", marca: "Asus", precio: 750, stock: 130 },
  { nombre: "Auriculares Razer Kraken", marca: "Razer", precio: 80, stock: 100 },
  { nombre: "Impresora HP LaserJet", marca: "HP", precio: 400, stock: 50 },
  { nombre: "Mousepad Logitech G", marca: "Logitech", precio: 25, stock: 300 },
  { nombre: "Laptop Lenovo ThinkPad", marca: "Lenovo", precio: 950, stock: 70 }
]);

db.computadoras.find().sort({ precio: -1 }); //Obtener todos los productos ordenados por precio de mayor a menor
db.computadoras.find({ stock: { $gte: 50, $lte: 150 } }); //Buscar productos que tengan un stock entre 50 y 150 unidades
db.computadoras.find({ precio: { $gt: 100 } }, { nombre: 1, marca: 1, _id: 0 }); //Mostrar solo el nombre y la marca de los productos cuyo precio sea mayor a 100
db.computadoras.find({ marca: { $in: ["HP", "Logitech"] } }); //Encontrar productos de la marca "HP" o "Logitech"
db.computadoras.find({ nombre: /Laptop/i }); //Buscar productos cuyo nombre contenga la palabra "Laptop"
db.computadoras.find({ stock: { $gte: 100 } }); //Obtener productos que no tengan stock menor a 100 (es decir, stock >= 100)
db.computadoras.find({ marca: "Razer", precio: { $gt: 50 } }); //Mostrar productos que tengan marca "Razer" y precio mayor a $50
db.computadoras.find({ precio: { $nin: [25, 100] } }); //Buscar productos cuyo precio no sea ni $25 ni $100
db.computadoras.find({ precio: { $type: "int" } }); //Encontrar productos con un tipo de dato "int" en el campo "precio"
db.computadoras.updateMany({}, { $mul: { precio: 1.1 } }); //Aumentar el precio de los productos en un 10%
db.computadoras.updateMany({}, { $inc: { stock: -5 } });  //Disminuir el stock en 5 unidades de todos los productos
db.computadoras.updateMany({ precio: { $gt: 100 } }, { $set: { enOferta: true } }); //Agregar un campo "enOferta: true" a los productos que cuesten más de $100
db.computadoras.updateMany({}, { $unset: { marca: "" } }); //Eliminar el campo "marca" de todos los productos
db.computadoras.updateMany({ nombre: /^T/ }, { $mul: { stock: 2 } }); //Duplicar el stock de los productos cuyo nombre empiece con "T"
db.computadoras.deleteMany({ precio: { $gt: 1000 } }); //Eliminar productos que cuesten más de $1000
db.computadoras.deleteMany({ stock: 0 }); //Borrar productos que tengan stock igual a 0
db.computadoras.deleteMany({ marca: { $ne: "Razer" } });  //Eliminar todos los productos excepto los de la marca "Razer"


db.computadoras.find()





















