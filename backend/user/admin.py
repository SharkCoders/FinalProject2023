import mysql.connector
from flask import Flask, render_template
import mysql.connector


class Administrador():
    def __init__(self):
        self.conn = mysql.connector.connect(
            port="",
            user="root",
            password="",
            database="librosbd"
        )
        self.cursor = self.conn.cursor()

    # CRUD ADMINISTRADOR

    def agregarlibro(self):
        titulo = input("Ingrese el título del libro: ")
        autor = input("Ingrese el autor del libro: ")
        categoria = input("Ingrese la categoria del libro: ")
        portada = input("Ingrese la imagen de portada: ")
        descripcion = input("Ingrese la descripción/resumen del libro: ")
        precio = int(input("ingrese precio: "))
        stock = int(input("ingrese stock disponible: "))
        self.cursor.execute('''
            INSERT INTO Libros (Titulo, Autor, Categoria, Portada, Descripcion, Precio, Stock)
            VALUES (%s, %s, %s, %s , %s, %s, %s)
        ''', (titulo, autor, categoria, portada, descripcion, precio, stock))
        self.conn.commit()

    def mostar_registos(self):
        sql = "SELECT * FROM Libros"
        self.cursor.execute(sql)
        fila = self.cursor.fetchall()
        for filas in fila:
            print("""
            ID :        {}
            TITULO :    {}
            AUTOR :     {}
            CATEGORIA : {}
            PORTADA: {}
            DESCRIPCION: {}
            PRECIO :    {}
            STOCK :     {}
            """.format(filas[0], filas[1], filas[2], filas[3], filas[4], filas[5], filas[6], filas[7]))
        self.conn.commit()

    def actualizar_registros(self):
        id = int(input("INGRESA EL ID del libro: "))
        titulo = input("ingrese el titulo del libro: ")
        autor = input("ingrese el autor del libro: ")
        categoria = input("ingrese la categoria del libro: ")
        portada = input("Ingrese la imagen de portada: ")
        descripcion = input("ingrese la descripción/resumen del libro: ")
        precio = int(input("ingrese precio: "))
        stock = int(input("ingrese stock disponible: "))
        sql = "UPDATE Libros SET Titulo=%s, Autor=%s, Categoria=%s, Portada=%s, Descripcion=%s, Precio=%s, Stock=%s WHERE id_libro=%s"
        self.cursor.execute(sql, (titulo, autor, categoria,
                            portada, descripcion, precio, stock, id))
        self.conn.commit()
        print("Libro Actualizado!")

    def borrar_libros(self):
        id = int(input("INGRESA EL ID del libro: "))
        sql = "DELETE FROM Libros WHERE id_libro=%s"
        self.cursor.execute(sql, (id,))
        self.conn.commit()
        print("El registro de libro ha sido eliminado con éxito.")

    def run(self):

        while True:

            print("\t ADMINISTRADOR DE USUARIO")
            print("=========================================")
            print("\t[1] Insertar libro")
            print("\t[2] Mostar libros")
            print("\t[3] Actualizar libros")
            print("\t[4] Eliminar libro")
            print("\t[0] Salir")
            print("=========================================")

            try:
                opcion = int(input("Selecciona una opcion: "))
                if (opcion == 1):
                    self.agregarlibro()
                elif (opcion == 2):
                    self.mostar_registos()
                elif (opcion == 3):
                    self.actualizar_registros()
                elif (opcion == 4):
                    self.borrar_libros()
                elif (opcion == 0):
                    break
                else:
                    print("Por favor, selecciona una opción válida")
            except ValueError:
                print("Por favor, selecciona una opción válida")

        self.conn.close()


if __name__ == "__main__":
    Admi = Administrador()
    Admi.run()
