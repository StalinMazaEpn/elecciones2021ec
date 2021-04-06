import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { EleccionesService } from "src/app/services/elecciones.service";

interface ICNERequest {
  datos: Dato[];
  fechaCorte: string;
  viewProcesamiento: string;
  conInformacion: boolean;
}

interface Dato {
  strNomPartido: string;
  strNomLista: string;
  strNomCandidato: string;
  intVotos: number;
  intVotosM: number;
  intVotosH: number;
  intOrdCandidato: number;
  porcentaje?: number;
  porcentajeReal?: number;
  porcentajeRealStr?: string;
}

function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}


@Component({
  selector: 'app-elecciones-primera-vuelta',
  templateUrl: './elecciones-primera-vuelta.component.html',
  styleUrls: ['./elecciones-primera-vuelta.component.scss']
})
export class EleccionesPrimeraVueltaComponent implements OnInit {

  name = "Angular Pipes por Stalin Maza";
  fechaHoy = Date.now();
  dataEleccionesVotos = 0;
  dataElecciones = [];
  loading = false;
  fechaCorte = '';
  datosEstadisticos: any = null;
  constructor(
    private eleccionesService: EleccionesService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.loading = true;
    this.eleccionesService.getDataApi().subscribe((data: ICNERequest) => {
      //vonsole.log('data', data)

      this.mapDataFromApi(data);
      this.loading = false;
    });
  }

  mapDataFromApi(data: ICNERequest) {
    this.fechaCorte = data.fechaCorte;
    let viewProcesamiento = data.viewProcesamiento;
    viewProcesamiento = replaceAll(viewProcesamiento, `class="tablaActProIn"`, `class="tablaActProIn table table-striped"`);
    viewProcesamiento = viewProcesamiento.replace(`class="tablaActProIn padTop"`, `class="tablaActProIn table table-striped"`);
    this.datosEstadisticos = this.sanitizer.bypassSecurityTrustHtml(viewProcesamiento);
    this.dataEleccionesVotos = data.datos
      .map(data => data.intVotos)
      .reduce(function (acc, intVotos) {
        return acc + intVotos;
      }, 0);
    this.dataElecciones = data.datos.map(candidato => {
      candidato.porcentajeReal =
        (candidato.intVotos * 100) / this.dataEleccionesVotos;
      candidato.porcentajeRealStr = candidato.porcentajeReal.toFixed(2);
      candidato.porcentaje = parseFloat(candidato.porcentajeRealStr);
      return candidato;
    });
    this.dataElecciones
      .sort(function (a, b) {
        const keyA = a.porcentaje,
          keyB = b.porcentaje;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      })
      .reverse();
  }

}
