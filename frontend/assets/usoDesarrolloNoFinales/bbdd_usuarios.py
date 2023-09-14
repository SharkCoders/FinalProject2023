import sqlite3
import pandas as pd

# Conectarse a la base de datos o crearla si no existe
conn = sqlite3.connect('usuarios.db')
cursor = conn.cursor()

# Crear la tabla si no existe
cursor.execute('''
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre TEXT,
        Apellido TEXT,
        Clave TEXT,
        Email TEXT
    )
''')
conn.commit()

def insertar_usuario():
    nombre = input("Ingrese el nombre: ")
    apellido = input("Ingrese el apellido: ")
    clave = input("Ingrese la clave: ")
    email = input("Ingrese el correo electrónico: ")

    cursor.execute('''
        INSERT INTO usuarios (Nombre, Apellido, Clave, Email)
        VALUES (?, ?, ?, ?)
    ''', (nombre, apellido, clave, email))
    conn.commit()

def obtener_usuarios():
    cursor.execute('SELECT * FROM usuarios')
    usuarios = cursor.fetchall()
    return usuarios

def eliminar_usuario():
    id_usuario = input("Ingrese el ID del usuario que desea eliminar: ")
    cursor.execute('DELETE FROM usuarios WHERE id = ?', (id_usuario,))
    conn.commit()

while True:
    print("\n1. Agregar usuario")
    print("2. Ver usuarios")
    print("3. Eliminar usuario por ID")
    print("4. Salir")
    opcion = input("Seleccione una opción: ")

    if opcion == '1':
        insertar_usuario()
    elif opcion == '2':
        usuarios = obtener_usuarios()
        if usuarios:
            df = pd.DataFrame(usuarios, columns=["ID", "Nombre", "Apellido", "Clave", "Email"])
            print("\nUsuarios registrados:")
            print(df)
        else:
            print("\nNo hay usuarios registrados.")
    elif opcion == '3':
        eliminar_usuario()
        print("Usuario eliminado correctamente.")
    elif opcion == '4':
        break
    else:
        print("Opción no válida. Intente de nuevo.")

# Cerrar la conexión a la base de datos
conn.close()