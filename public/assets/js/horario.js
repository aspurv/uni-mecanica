// Cargar datos desde el archivo JSON
fetch('/public/assets/json/horario.json')
  .then(response => response.json()) // Parsear la respuesta como JSON
  .then(data => {
    const tablaCuerpo = document.getElementById(data.tablaCuerpo); // Obtener el cuerpo de la tabla desde el JSON

    // Llenar la tabla con datos
    data.datos.forEach(filaDatos => {
      const fila = tablaCuerpo.insertRow(); // Crear una nueva fila en la tabla
      filaDatos.forEach(dato => {
        const celda = fila.insertCell(); // Crear una nueva celda en la fila
        if (dato === 'MC510-C/D / VIRTUAL(T)'){
          celda.textContent = dato;
          celda.rowSpan = 2; // Fusionar filas si el dato es específico
          celda.classList.add('celda-con-datos'); // Agregar una clase a la celda
        } else if (dato === 'MC520-C/D / VIRTUAL(T)') {
          celda.textContent = dato;
          celda.rowSpan = 3;
          celda.classList.add('celda-con-datos');
        } else if (dato === 'MC500-C/D / VIRTUAL(T)'){
          celda.textContent = dato;
          celda.rowSpan = 1;
          celda.classList.add('celda-con-datos');
        } else {
          celda.textContent = dato; // Asignar el dato a la celda
        }
      });
    });

  });