document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('registroForm');
    const themeToggle = document.getElementById('themeToggle');
    const datosValidos = [];

    // Alternar modo claro/oscuro
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Modo Claro</span>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Modo Oscuro</span>';
            localStorage.setItem('theme', 'light');
        }
    });

    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Modo Claro</span>';
    }

    // Validación del formulario
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        
        limpiarErrores();
        
        const nombreValido = validarNombre();
        const emailValido = validarEmail();
        const telefonoValido = validarTelefono();
        const fechaValida = validarFechaNacimiento();
        const generoValido = validarGenero();
        const direccionValida = validarDireccion();
        const terminosValidos = validarTerminos();
        
        if (nombreValido && emailValido && telefonoValido && fechaValida && 
            generoValido && direccionValida && terminosValidos) {
            
            const datosFormulario = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                fechaNacimiento: document.getElementById('fechaNacimiento').value,
                genero: document.querySelector('input[name="genero"]:checked').value,
                direccion: document.getElementById('direccion').value,
                terminos: document.getElementById('terminos').checked
            };
            
            datosValidos.push(datosFormulario);
            mostrarDatos(datosFormulario);
            formulario.reset();
        }
    });
    
    function limpiarErrores() {
        const errores = document.querySelectorAll('.error');
        errores.forEach(error => error.textContent = '');
    }
    
    function mostrarError(id, mensaje) {
        const elementoError = document.getElementById(id + 'Error');
        if (elementoError) {
            elementoError.textContent = mensaje;
        }
    }
    
    function validarNombre() {
        const nombre = document.getElementById('nombre').value.trim();
        if (nombre === '') {
            mostrarError('nombre', 'El nombre completo es requerido.');
            return false;
        }
        if (nombre.length < 3) {
            mostrarError('nombre', 'El nombre debe tener al menos 3 caracteres.');
            return false;
        }
        return true;
    }
    
    function validarEmail() {
        const email = document.getElementById('email').value.trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            mostrarError('email', 'El correo electrónico es requerido.');
            return false;
        }
        if (!regexEmail.test(email)) {
            mostrarError('email', 'Por favor ingresa un correo electrónico válido.');
            return false;
        }
        return true;
    }
    
    function validarTelefono() {
        const telefono = document.getElementById('telefono').value.trim();
        const regexTelefono = /^[0-9]{9,15}$/;
        
        if (telefono === '') {
            mostrarError('telefono', 'El número de teléfono es requerido.');
            return false;
        }
        if (!regexTelefono.test(telefono)) {
            mostrarError('telefono', 'Por favor ingresa un número de teléfono válido (9-15 dígitos).');
            return false;
        }
        return true;
    }
    
    function validarFechaNacimiento() {
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        if (!fechaNacimiento) {
            mostrarError('fechaNacimiento', 'La fecha de nacimiento es requerida.');
            return false;
        }
        
        const fechaActual = new Date();
        const fechaIngresada = new Date(fechaNacimiento);
        if (fechaIngresada > fechaActual) {
            mostrarError('fechaNacimiento', 'La fecha de nacimiento no puede ser futura.');
            return false;
        }
        
        const edadMinima = new Date();
        edadMinima.setFullYear(edadMinima.getFullYear() - 18);
        if (fechaIngresada > edadMinima) {
            mostrarError('fechaNacimiento', 'Debes tener al menos 18 años.');
            return false;
        }
        
        return true;
    }
    
    function validarGenero() {
        const generoSeleccionado = document.querySelector('input[name="genero"]:checked');
        if (!generoSeleccionado) {
            mostrarError('genero', 'Por favor selecciona un género.');
            return false;
        }
        return true;
    }
    
    function validarDireccion() {
        const direccion = document.getElementById('direccion').value.trim();
        if (direccion === '') {
            mostrarError('direccion', 'La dirección es requerida.');
            return false;
        }
        if (direccion.length < 10) {
            mostrarError('direccion', 'La dirección debe tener al menos 10 caracteres.');
            return false;
        }
        return true;
    }
    
    function validarTerminos() {
        const terminosAceptados = document.getElementById('terminos').checked;
        if (!terminosAceptados) {
            mostrarError('terminos', 'Debes aceptar los términos y condiciones.');
            return false;
        }
        return true;
    }
    
    function mostrarDatos(datos) {
        let mensaje = `📋 Datos del formulario:\n\n`;
        mensaje += `👤 Nombre: ${datos.nombre}\n`;
        mensaje += `📧 Email: ${datos.email}\n`;
        mensaje += `📱 Teléfono: ${datos.telefono}\n`;
        mensaje += `🎂 Fecha de Nacimiento: ${datos.fechaNacimiento}\n`;
        mensaje += `🚻 Género: ${datos.genero}\n`;
        mensaje += `🏠 Dirección: ${datos.direccion}\n`;
        mensaje += `✅ Términos aceptados: ${datos.terminos ? 'Sí' : 'No'}\n\n`;
        mensaje += `✨ Total de envíos válidos: ${datosValidos.length}`;
        
        alert(mensaje);
    }
});