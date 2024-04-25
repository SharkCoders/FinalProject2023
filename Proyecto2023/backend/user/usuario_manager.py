import mysql.connector
import pandas as pd

# Conéctate a la base de datos MySQL
conexion = mysql.connector.connect(
    host="127.0.0.1",       # Host de tu servidor MySQL
    user="root",      # Tu nombre de usuario de MySQL
    password="",  # Tu contraseña de MySQL
    database=""    # Nombre de la base de datos MySQL
)

cursor = conexion.cursor()

# Crear la tabla si no existe
cursor.execute('''
    CREATE TABLE IF NOT EXISTS usuario (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Nombre VARCHAR(255),
        correo_electronico VARCHAR(255) UNIQUE NOT NULL,
        contrasena VARCHAR(255) NOT NULL,
        direccion_envio TEXT
    )
''')

def insertar_usuario():
    nombre = input("Ingrese su nombre y apellido: ")
    correo_electronico = input("Ingrese su correo electrónico: ")
    contrasena = input("Ingrese la contraseña: ")
    direccion_envio = input("Ingrese el domicilio donde desea recibir su compra: ")

    cursor.execute('''
        INSERT INTO usuario (Nombre, correo_electronico, contrasena, direccion_envio)
        VALUES (%s, %s, %s, %s)
    ''', (nombre, correo_electronico, contrasena, direccion_envio))
    conexion.commit()

def obtener_usuarios():
    cursor.execute('SELECT * FROM usuarios')
    usuario = cursor.fetchall()
    return usuario

def eliminar_usuario():
    id_usuario = input("Ingrese el ID del usuario que desea eliminar: ")
    cursor.execute('DELETE FROM usuarios WHERE id = %s', (id_usuario,))
    conexion.commit()

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
            df = pd.DataFrame(usuarios, columns=["ID", "Nombre", "correo_electronico", "contrasena", "direccion_envio"])
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
conexion.close()

# Conéctate a la base de datos MySQL
conexion = mysql.connector.connect(
    host="127.0.0.1", # Host de tu servidor MySQL
    user="root", # Tu nombre de usuario de MySQL
    password="", # Tu contraseña de MySQL
    database="librosbd" # Nombre de la base de datos MySQL
)

cursor = conexion.cursor()