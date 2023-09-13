import mysql.connector

# conexion con el servidor de la base de datos mysql
conn = mysql.connector.connect(
    host="",       # Host de tu servidor MySQL
    user="root",      # Tu nombre de usuario de MySQL
    password="",  # Tu contraseña de MySQL
    database=""    # Nombre de la base de datos MySQL
)
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS Libro (
        id_libro INTEGER PRIMARY KEY AUTOINCREMENT,
        Titulo TEXT,
        Autor TEXT,
        Categoria TEXT,
        Precio INT,
        Stock INT
    
       
    )
''')
conn.commit()

# CRUD ADMINISTRADOR


def agregarlibro():
    titulo = input("Ingrese la titulo del libro: ")
    autor = input("Ingrese el autor del libro: ")
    categoria = input("Ingrese lacategoria del libro: ")
    precio = int(input("ingrese precio:"))
    stock = int(input("ingrese stock disponible:"))

    cursor.execute('''
        INSERT INTO Libro (Titulo, Autor, Categoria, Precio, Stock)
        VALUES (%s, %s, %s, %s , %s)
    ''', (titulo, autor, categoria, precio, stock))
    conn.commit()


def mostar_registos():
    sql = "SELECT * FROM Libro"
    cursor.execute(sql)
    fila = cursor.fetchall()
    for filas in fila:
        print(""" 
        ID :        {}
        TITULO :    {}
        AUTOR :     {}
        CATEGORIA : {}
        PRECIO :    {}
        STOCK :     {}
        """.format(filas[0], filas[1], filas[2], filas[3], filas[4], filas[5]))

    conn.commit()


def actualizar_registros():
    id = int(input("INGRESA EL ID del libro: "))
    titulo = input("ingrese el titulo del libro :")
    autor = input("ingrese el autor del libro :")
    categoria = input("ingrese la categoria del libro :")
    precio = int(input("ingrese precio :"))
    stock = int(input("ingrese stock disponible :"))
    sql = f"UPDATE Libro set Titulo= '{titulo}', Autor='{autor}',Categoria='{categoria}',Precio={precio},Stock={stock} WHERE id_libro= {id} "
    cursor.execute(sql)
    print(" Registro Actualizado!")
    conn.commit()


def borrar_libros():

    id = int(input("INGRESA EL ID del libro: "))
    cursor.execute("""
        DELETE FROM Libro
        WHERE id_libro= ?
        """, (id,))
    conn.commit()

    print("El registro de libro ha sido eliminado con exito .")


while True:
    print("=========================================")
    print("\t ADMINISTRADOR DE USUARIO")
    print("=========================================")
    print("\t[1] Insertar registro")
    print("\t[2] Mostar registros")
    print("\t[3] Actualizar registros")
    print("\t[4] Eliminar registros")
    print("\t[0] Salir")
    print("=========================================")

    try:
        opcion = int(input("Selecciona una opcion: "))
        if (opcion == 1):
            agregarlibro()
        elif (opcion == 2):
            mostar_registos()
        elif (opcion == 3):
            actualizar_registros()

        elif (opcion == 4):
            borrar_libros()

        elif (opcion == 0):
            break
    except:
        print("Por favor, selecciona una opcion valida")

conn.commit()
conn.close()
