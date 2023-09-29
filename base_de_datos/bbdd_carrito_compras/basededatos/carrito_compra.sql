create database libreria;
use libreria;
CREATE TABLE Usuarios (
   usuario_id INT AUTO_INCREMENT PRIMARY KEY,
   nombre VARCHAR(255) NOT NULL,
   correo_electronico VARCHAR(255) UNIQUE NOT NULL,
   contrasena VARCHAR(255) NOT NULL,
   direccion_envio TEXT
);

CREATE TABLE Libros (
   libro_id INT AUTO_INCREMENT PRIMARY KEY,
   titulo VARCHAR(255) NOT NULL,
   autor VARCHAR(255),
   categoria VARCHAR(255),
   precio DECIMAL(10, 2) NOT NULL,
   stock INT NOT NULL,
   descripcion TEXT,
   portada VARCHAR(255)
);

CREATE TABLE Carritos (
   carrito_id INT AUTO_INCREMENT PRIMARY KEY,
   usuario_id INT NOT NULL,
   estado VARCHAR(50),
   FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

CREATE TABLE Pedidos (
   pedido_id INT AUTO_INCREMENT PRIMARY KEY,
   carrito_id INT NOT NULL,
   fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   total DECIMAL(10, 2) NOT NULL,
   direccion_envio TEXT,
   estado VARCHAR(50),
   FOREIGN KEY (carrito_id) REFERENCES Carritos(carrito_id)
);

CREATE TABLE Compra (
   compra_id INT AUTO_INCREMENT PRIMARY KEY,
   usuario_id INT NOT NULL,
   fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   total DECIMAL(10, 2) NOT NULL,
   direccion_envio TEXT,
   estado VARCHAR(50),
   FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

CREATE TABLE ProductosEnPedidos (
   detalle_id INT AUTO_INCREMENT PRIMARY KEY,
   pedido_id INT NOT NULL,
   libro_id INT NOT NULL,
   cantidad INT NOT NULL,
   precio_unitario DECIMAL(10, 2) NOT NULL,
   FOREIGN KEY (pedido_id) REFERENCES Pedidos(pedido_id),
   FOREIGN KEY (libro_id) REFERENCES Libros(libro_id)
);