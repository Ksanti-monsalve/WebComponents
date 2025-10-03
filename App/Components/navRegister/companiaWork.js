import { postWorks } from "../../../Apis/work/workApi.js";

export class CompaniaWork extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  async render() {
    this.innerHTML = /* html */ `
    
      <h3>Registrar Compañía</h3>
      <form id="companiaForm">
        <div class="mb-3">
          <label for="nombreCompania" class="form-label">Nombre de la Compañía</label>
          <input type="text" id="nombreCompania" class="form-control" placeholder="Ej: ACME S.A." required />
        </div>
        <div class="mb-3">
          <label for="ukNiu" class="form-label">Niu</label>
          <input type="text" id="ukNiu" class="form-control" placeholder="Ej: 123456789" required />
        </div>
        <div class="mb-3">
          <label for="direccionCompania" class="form-label">Dirección</label>
          <input type="text" id="direccionCompania" class="form-control" placeholder="Ej: Calle 123 #45-67" required />
        </div>
        <div class="mb-3">
          <label for="ciudadSelect" class="form-label">Ciudad</label>
          <select id="ciudadSelect" class="form-select" required>
            <option value="">-- Selecciona una ciudad --</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="emailCompania" class="form-label">Email</label>
          <input type="email" id="emailCompania" class="form-control" placeholder="Ej: contacto@acme.com" required />
        </div>
        <button type="submit" class="btn btn-primary">Guardar</button>
      </form>
      <div id="mensajeCompania" class="mt-3"></div>
    `;

    await this.cargarCiudades();

    this.querySelector("#companiaForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombreCompania = this.querySelector("#nombreCompania").value.trim();
      const ukNiu = this.querySelector("#ukNiu").value.trim();
      const direccion = this.querySelector("#direccionCompania").value.trim();
      const ciudadId = this.querySelector("#ciudadSelect").value;
      const email = this.querySelector("#emailCompania").value.trim();

      if (!nombreCompania || !ukNiu || !direccion || !ciudadId || !email) {
        this.mostrarMensaje("Debes completar todos los campos", "danger");
        return;
      }

      const datos = {
        name: nombreCompania,
        UKNiu: ukNiu,
        address: direccion,
        CityId: parseInt(ciudadId),
        email: email
      };

      try {
        const response = await postWorks(datos, "companies");
        if (response.ok) {
          this.mostrarMensaje("Compañía registrada correctamente", "success");
          this.querySelector("#companiaForm").reset();
        } else {
          this.mostrarMensaje("Error al registrar la compañía", "danger");
        }
      } catch (err) {
        console.error(err);
        this.mostrarMensaje("Error en la conexión con la API", "danger");
      }
    });
  }

  async cargarCiudades() {
    try {
      const response = await fetch("http://25.0.237.35:3000/cities");
      const ciudades = await response.json();
      const select = this.querySelector("#ciudadSelect");

      ciudades.forEach(c => {
        const option = document.createElement("option");
        option.value = c.id;
        option.textContent = c.name;
        select.appendChild(option);
      });
    } catch (err) {
      console.error("Error cargando ciudades:", err);
    }
  }

  mostrarMensaje(msg, tipo) {
    const div = this.querySelector("#mensajeCompania");
    div.innerHTML = `<div class="alert alert-${tipo}" role="alert">${msg}</div>`;
  }
}

customElements.define("compania-work", CompaniaWork);