import { postWorks, getWorks } from "../../../Apis/work/workApi.js";

export class CompaniaWork extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  async render() {
    this.innerHTML = /* html */ `
      <div class="card shadow-sm mx-auto mt-5" style="max-width: 500px; border-radius: 18px;">
        <div class="card-body">
          <h3 class="card-title text-center text-primary mb-4" style="font-weight: bold;">Registrar Compañía</h3>
          <form id="companiaForm">
            <div class="mb-4">
              <label for="nombreCompania" class="form-label fw-semibold">Nombre de la Compañía</label>
              <input type="text" id="nombreCompania" class="form-control" placeholder="Ej: ACME S.A." required style="border-radius: 10px;"/>
            </div>
            <div class="mb-4">
              <label for="ukNiu" class="form-label fw-semibold">Niu</label>
              <input type="text" id="ukNiu" class="form-control" placeholder="Ej: 123456789" required style="border-radius: 10px;"/>
            </div>
            <div class="mb-4">
              <label for="direccionCompania" class="form-label fw-semibold">Dirección</label>
              <input type="text" id="direccionCompania" class="form-control" placeholder="Ej: Calle 123 #45-67" required style="border-radius: 10px;"/>
            </div>
            <div class="mb-4">
              <label for="ciudadSelect" class="form-label fw-semibold">Ciudad</label>
              <select id="ciudadSelect" class="form-select" required style="border-radius: 10px;">
                <option value="">-- Selecciona una ciudad --</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="emailCompania" class="form-label fw-semibold">Email</label>
              <input type="email" id="emailCompania" class="form-control" placeholder="Ej: contacto@acme.com" required style="border-radius: 10px;"/>
            </div>
            <button type="submit" class="btn btn-primary w-100 py-2" style="border-radius: 10px; font-weight: bold;">Guardar</button>
          </form>
          <div id="mensajeCompania" class="mt-3"></div>
        </div>
      </div>
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
      const response = await getWorks("cities");
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