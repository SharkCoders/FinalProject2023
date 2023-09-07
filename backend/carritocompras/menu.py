from logging import exception
from pedido import *
from producto import *

def obtener_numero_entero(mensaje):
    while True:
        try:
            numero = int(input(mensaje))
            return numero
        except ValueError:
            print("Por favor, ingrese un número entero válido.")

def mostrar_menu():
    print("Opciones:")
    print("1. Agregar producto al pedido")
    print("2. Mostrar productos en el pedido")
    print("3. Mostrar total del pedido")
    print("4. Eliminar producto del pedido")
    print("5. Salir")

if __name__ == "__main__":
    p1 = Producto(1, "producto 1", 5)
    p2 = Producto(2, "producto 2", 15)
    p3 = Producto(3, "producto 3", 25)

    pedido = Pedido()

    try:
        pedido.añadir_producto(p1, 9)
        pedido.añadir_producto(p2, 5)
        pedido.añadir_producto(p3, 14)

        while True:
            mostrar_menu()
            opcion = obtener_numero_entero("Seleccione una opción: ")

            if opcion == 1:
                print("Productos disponibles:")
                print("1. producto 1")
                print("2. producto 2")
                print("3. producto 3")

                codigo_producto = obtener_numero_entero("Seleccione un código de producto: ")
                cantidad = obtener_numero_entero("Ingrese la cantidad: ")

                if codigo_producto == 1:
                    producto = p1
                elif codigo_producto == 2:
                    producto = p2
                elif codigo_producto == 3:
                    producto = p3
                else:
                    print("Código de producto no válido.")
                    continue

                pedido.añadir_producto(producto, cantidad)
                
            elif opcion == 2:
                if len(pedido.productos) == 0:
                    print("No hay productos en el pedido.")
                else:
                    pedido.mostrar_producto()

            elif opcion == 3:
                total = pedido.total_pedido()
                print("Total del pedido:", total)

            elif opcion == 4:
                if len(pedido.productos) == 0:
                    print("No hay productos en el pedido para eliminar.")
                else:
                    pedido.mostrar_producto()
                    codigo_eliminar = obtener_numero_entero("Ingrese el código del producto a eliminar: ")
                    producto_eliminar = None
                    for producto, _ in zip(pedido.productos, pedido.cantidades):
                        if producto.Codigo == codigo_eliminar:
                            producto_eliminar = producto
                            break

                    if producto_eliminar:
                        pedido.eliminar_producto(producto_eliminar)
                        print("Producto eliminado del pedido.")
                    else:
                        print("No se encontró el producto en el pedido.")

            elif opcion == 5:
                print("Gracias por usar el sistema de pedidos")
                break

            else:
                print("Opción inválida. Por favor, seleccione una opción válida.")

    except Exception as e:
        print(e)



# from logging import exception
# from pedido import * 
# from producto import *


# #############     AQUÍ CONSTRUYAN UN MENÚ DE OPCIONES     ++++++++++++++++++++++++


# p1 = Producto(1, "producto 1", 5)
# p2 = Producto(2, "producto 2", 15)
# p3 = Producto(3, "producto 3", 25)

# pedido = Pedido()

# try:
#     pedido.añadir_producto(p1,9)
#     pedido.añadir_producto(p2,5)
#     pedido.añadir_producto(p3,14)

#     print ('El total del pedido es: '+str(pedido.total_pedido()))

#     pedido.mostrar_producto()

#     pedido.eliminar_producto(p2)

#     pedido.mostrar_producto()

# except Exception as e:
#     print(e)
