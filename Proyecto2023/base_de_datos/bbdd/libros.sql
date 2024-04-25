create database librosbd;
use librosbd;

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