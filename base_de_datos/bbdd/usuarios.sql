create database usuarios;
use usuarios;

CREATE TABLE Usuario (
   usuario_id INT AUTO_INCREMENT PRIMARY KEY,
   nombre VARCHAR(255) NOT NULL,
   correo_electronico VARCHAR(255) UNIQUE NOT NULL,
   contrasena VARCHAR(255) NOT NULL,
   direccion_envio TEXT
);