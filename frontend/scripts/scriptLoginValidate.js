// Solo se permiten letras y numeros
var ExpresionRegular = /^[a-zA-Z0-9]+$/;


(() => {
  'use strict'
  const login = document.querySelectorAll('#login');


  const registro = document.querySelectorAll('#registro');


  // -------------------- LOGIN


  Array.from(login).forEach(form => {
    form.addEventListener('submit', event => {


      function validarForm() {
        event.preventDefault()
        event.stopPropagation()
      }
      // Leemos los valores del formulario
      let usuario = document.getElementById("usuario").value;
      let contrasena = document.getElementById("contrasena").value;


      if (!form.checkValidity()) {
        validarForm();
      }


      // VALIDAR USUARIO y que sea texto y numero. También APARECE esta alerta cuando no se ingresan datos y se acciona el botón INGRESAR


      if (!ExpresionRegular.test(usuario)) {
        alert('Usuario o Contraseña no coinciden. Intente nuevamente.');
        validarForm();
      }


      // Validar que la contraseña sea mayor a 4 digitos
      if (contrasena.length <= 4) {
        validarForm();
        document.getElementById("contrasena").classList.add('is-invalid');
      } else {
        // Si la contraseña es mayor a 4 digitos, quitar la clase de error
        document.getElementById("clave_requerida").style.display = "none";


        // Validar que el usuario y contraseña coincidan
        if (usuario == "mlibro" && contrasena == "12345") {
          validarForm();
          // Redireccionamos
          window.location.href = "index.html";
        } else {
          // Mostrar alerta
          validarForm();
          alert('El usuario o contraseña no coinciden. Reintente nuevamente.');
        }


      }


      form.classList.add('was-validated')
    }, false)
  })


  // -------------------- REGISTRO


  Array.from(registro).forEach(form => {
    form.addEventListener('submit', event => {


      var usuario = document.getElementById("registroUsuario").value;
      var correo = document.getElementById("registroCorreo").value;
      var contrasena = document.getElementById("registroContrasena");
      var contrasenaRepetir = document.getElementById("registroContrasenaRepetir");
      var errorMensaje = document.getElementById("error-message");


      // Validador general
      function validarForm() {
        event.preventDefault()
        event.stopPropagation()
      }
      // Validar contraseñas
      function validarClaves() {
        if (contrasena.value !== contrasenaRepetir.value) {
          errorMensaje.textContent = "Las contraseñas no coinciden.";
          validarForm();
          return false;


        } else {
          errorMensaje.textContent = "";
          validarForm();
          return true;
        }
      }


      // Validar formulario a nivel general
      if (!form.checkValidity()) {
        validarForm();
      }


      // Validar el usuario si cumple con letras y numeros
      if (!usuario.match(ExpresionRegular)) {
        validarForm();


        // Validar que la contraseña sea mayor a 4 digitos
      } else if (contrasena.length < 4) {
        validarForm();
      } else if (validarClaves()) {
        // Las validaciones pasaron; puede proceder con la autenticación
        // Aquí puede enviar los datos del usuario al servidor para el registro
        document.getElementById('alertaOk').style.display = "block";
        document.getElementById('registroBoton').style.display = "none";


        // Redireccionamos
        setTimeout(() => {
          window.location.reload(); // Recargar pagina
        }, 5000);
      }




      form.classList.add('was-validated')
    }, false)
  })


})()
