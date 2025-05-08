let consultas = [];
let farmacia = [];
let indiceEditarConsulta = -1;
let indiceEditarFarmacia = -1;

function registrarConsulta() {
    const nombre = document.getElementById('nombreConsulta').value.trim();
    const dni = document.getElementById('dniConsulta').value.trim();
    const motivo = document.getElementById('motivoConsulta').value.trim();
    if (!validarCampos(nombre, dni, motivo)) return;
    
    if (indiceEditarConsulta === -1) {
        consultas.push({ nombre, dni, motivo });
    } else {
        consultas[indiceEditarConsulta] = { nombre, dni, motivo };
        indiceEditarConsulta = -1;
    }
    
    mostrarConsultas();
    actualizarListaPacientesFarmacia();
    limpiarCampos(['nombreConsulta', 'dniConsulta', 'motivoConsulta']);
}

function registrarFarmacia() {
    const nombre = document.getElementById('nombreFarmacia').value;
    const dni = document.getElementById('dniFarmacia').value.trim();
    const medicamento = document.getElementById('medicamento').value;
    if (!validarCampos(nombre, dni, medicamento)) return;

    if (indiceEditarFarmacia === -1) {
        farmacia.push({ nombre, dni, medicamento });
    } else {
        farmacia[indiceEditarFarmacia] = { nombre, dni, medicamento };
        indiceEditarFarmacia = -1;
    }

    mostrarFarmacia();
    limpiarCampos(['nombreFarmacia', 'dniFarmacia', 'medicamento']);
    actualizarListaPacientesFarmacia();
}

function mostrarConsultas() {
    const tabla = document.getElementById('tablaConsultas');
    tabla.innerHTML = '';
    consultas.forEach((c, i) => {
        tabla.innerHTML += `<tr>
            <td>${c.nombre}</td>
            <td>${c.dni}</td>
            <td>${c.motivo}</td>
            <td><button class="btn btn-danger btn-sm" onclick="eliminarConsulta(${i})">Eliminar</button></td>
            <td><button class="btn btn-warning btn-sm" onclick="editarConsulta(${i})">Editar</button></td>
        </tr>`;
    });
}

function mostrarFarmacia() {
    const tabla = document.getElementById('tablaFarmacia');
    tabla.innerHTML = '';
    farmacia.forEach((f, i) => {
        tabla.innerHTML += `<tr>
            <td>${f.nombre}</td>
            <td>${f.dni}</td>
            <td>${f.medicamento}</td>
            <td><button class="btn btn-danger btn-sm" onclick="eliminarFarmacia(${i})">Eliminar</button></td>
            <td><button class="btn btn-warning btn-sm" onclick="editarFarmacia(${i})">Editar</button></td>
        </tr>`;
    });
}

function eliminarConsulta(index) {
    consultas.splice(index, 1);
    mostrarConsultas();
    actualizarListaPacientesFarmacia();
}

function eliminarFarmacia(index) {
    farmacia.splice(index, 1);
    mostrarFarmacia();
}

function editarConsulta(i) {
    const c = consultas[i];
    document.getElementById('nombreConsulta').value = c.nombre;
    document.getElementById('dniConsulta').value = c.dni;
    document.getElementById('motivoConsulta').value = c.motivo;
    indiceEditarConsulta = i;
}

function editarFarmacia(i) {
    const f = farmacia[i];
    document.getElementById('nombreFarmacia').value = f.nombre;
    document.getElementById('dniFarmacia').value = f.dni;
    document.getElementById('medicamento').value = f.medicamento;
    indiceEditarFarmacia = i;
}

function validarCampos(nombre, dni, campoExtra) {
    if (nombre === '' || dni === '' || campoExtra === '') {
        alert("Todos los campos son obligatorios.");
        return false;
    }
    if (dni.length !== 8 || isNaN(dni)) {
        alert("DNI inválido. Debe tener 8 dígitos numéricos.");
        return false;
    }
    return true;
}

function limpiarCampos(ids) {
    ids.forEach(id => {
        document.getElementById(id).value = '';
    });
}

// Actualiza el SELECT con los nombres de los pacientes registrados
function actualizarListaPacientesFarmacia() {
    const select = document.getElementById('nombreFarmacia');
    select.innerHTML = '<option value="">Seleccione un paciente</option>';
    consultas.forEach(c => {
        const option = document.createElement('option');
        option.value = c.nombre;
        option.textContent = c.nombre;
        select.appendChild(option);
    });
}

function actualizarDniFarmacia() {
    const nombreSeleccionado = document.getElementById('nombreFarmacia').value;
    const paciente = consultas.find(c => c.nombre === nombreSeleccionado);
    document.getElementById('dniFarmacia').value = paciente ? paciente.dni : '';
}

mostrarConsultas();
mostrarFarmacia();
