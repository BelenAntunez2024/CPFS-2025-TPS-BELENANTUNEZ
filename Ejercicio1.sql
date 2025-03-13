use facturacion;

CREATE TABLE E01_CLIENTE (
    nro_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    apellido VARCHAR(45) NOT NULL,
    direccion VARCHAR(45),
    activo TINYINT NOT NULL
);

CREATE TABLE E01_TELEFONO (
    codigo_area INT NOT NULL,
    nro_telefono INT NOT NULL,
    tipo CHAR(1) NOT NULL,
    nro_cliente INT NOT NULL, -- Asegurar que no sea NULL para que siempre tenga un cliente
    PRIMARY KEY (codigo_area, nro_telefono),  
    FOREIGN KEY (nro_cliente) REFERENCES E01_CLIENTE(nro_cliente) ON DELETE CASCADE
);
-- Tabla PRODUCTO
CREATE TABLE E01_PRODUCTO (
    codigo_producto INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(45) NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    descripcion VARCHAR(45),
    precio DECIMAL(10,2) NOT NULL,  -- Usar DECIMAL para valores monetarios
    stock INT NOT NULL
);

-- Tabla FACTURA (relacionada con CLIENTE)
CREATE TABLE E01_FACTURA (
    nro_factura INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    total_sin_iva DECIMAL(10,2) NOT NULL,
    iva DECIMAL(10,2) NOT NULL,
    total_con_iva DECIMAL(10,2) NOT NULL,
    nro_cliente INT NOT NULL,
    FOREIGN KEY (nro_cliente) REFERENCES E01_CLIENTE(nro_cliente)
);

-- Tabla DETALLE_FACTURA (relacionada con FACTURA y PRODUCTO)
CREATE TABLE E01_DETALLE_FACTURA (
    nro_factura INT NOT NULL,
    nro_item INT NOT NULL,
    cantidad DECIMAL(10,2) NOT NULL,  -- Cambiado de FLOAT a DECIMAL
    codigo_producto INT NOT NULL,
    PRIMARY KEY (nro_factura, nro_item),  -- Clave primaria compuesta
    FOREIGN KEY (nro_factura) REFERENCES E01_FACTURA(nro_factura),
    FOREIGN KEY (codigo_producto) REFERENCES E01_PRODUCTO(codigo_producto)
);