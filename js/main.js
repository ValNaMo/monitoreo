const API_URL = 'http://3.236.175.221:5000/api/devices';
const tablaBody = document.getElementById('tablaDatos');
const statusActual = document.getElementById('statusActual');

async function obtenerDatos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al obtener los datos');

        const data = await response.json();
        console.log(data); // Ver en consola la estructura

        // Limpiar la tabla antes de renderizar
        tablaBody.innerHTML = '';

        if (Array.isArray(data.devices)) {
            // Mostrar el status del primer dispositivo
            if (data.devices.length > 0) {
                statusActual.textContent = `Status actual: ${data.devices[0].status}`;
            } else {
                statusActual.textContent = 'Status actual: -';
            }

            // Pintar cada fila
            data.devices.forEach(item => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.ip}</td>
                    <td>${item.status}</td>
                    <td>${new Date(item.date).toLocaleString()}</td>
                `;
                tablaBody.appendChild(fila);
            });
        } else {
            statusActual.textContent = 'Status actual: -';
            tablaBody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-danger">❌ No se pudieron procesar los datos correctamente</td>
                </tr>
            `;
        }
    } catch (error) {
        console.error(error);
        tablaBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-danger">❌ No se pudieron obtener los datos</td>
            </tr>
        `;
        statusActual.textContent = 'Status actual: ERROR';
    }
}

// Ejecutar inmediatamente y luego cada 2 segundos
obtenerDatos();
setInterval(obtenerDatos, 2000);
