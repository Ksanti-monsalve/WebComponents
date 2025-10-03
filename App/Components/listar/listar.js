import { getWorks } from "../../../Apis/work/workApi.js";

export class ListarComponent extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  async render() {
    this.innerHTML = `
      <div class="container mt-4">
        <h3 class="text-primary mb-4 text-center">Listado General</h3>
        <select id="entidadSelect" class="form-select mb-4" style="max-width: 400px; margin: 0 auto;">
          <option value="countries">Países</option>
          <option value="regions">Regiones</option>
          <option value="cities">Ciudades</option>
          <option value="companies">Compañías</option>
          <option value="branches">Marcas/Sucursales</option>
        </select>
        <div id="tablaListar"></div>
      </div>
    `;
    await this.cargarListado("countries");

    this.querySelector("#entidadSelect").addEventListener("change", async (e) => {
      await this.cargarListado(e.target.value);
    });
  }

  async cargarListado(entidad) {
    try {
      const response = await getWorks(entidad);
      const datos = await response.json();
      const tablaDiv = this.querySelector("#tablaListar");

      if (!Array.isArray(datos) || datos.length === 0) {
        tablaDiv.innerHTML = `<div class="alert alert-info">No hay registros para mostrar.</div>`;
        return;
      }

      let columnas = [];
      switch (entidad) {
        case "countries":
          columnas = ["id", "name"];
          break;
        case "regions":
          columnas = ["id", "name", "CountryId"];
          break;
        case "cities":
          columnas = ["id", "name", "RegionId"];
          break;
        case "companies":
          columnas = ["id", "name", "UKNiu", "address", "CityId", "email"];
          break;
        case "branches":
          columnas = ["id", "numberComercial", "address", "email", "contact_name", "phone", "cityId", "CompanyId"];
          break;
      }

      let tabla = `
        <table class="table table-bordered table-hover">
          <thead class="table-light">
            <tr>
              ${columnas.map(col => `<th>${col}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
      `;
      datos.forEach(item => {
        tabla += `
          <tr>
            ${columnas.map(col => `<td>${item[col] ?? ""}</td>`).join("")}
          </tr>
        `;
      });
      tabla += `
          </tbody>
        </table>
      `;
      tablaDiv.innerHTML = tabla;
    } catch (err) {
      this.querySelector("#tablaListar").innerHTML = `<div class="alert alert-danger">Error al cargar los datos.</div>`;
      console.error(err);
    }
  }
}

customElements.define("listar-component", ListarComponent);