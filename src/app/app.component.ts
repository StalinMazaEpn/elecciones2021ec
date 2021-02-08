import { Component, OnInit, VERSION } from "@angular/core";
import { EleccionesService } from "./services/elecciones.service";

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

@Component({
  selector: "elecciones-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Angular Pipes por Stalin Maza";
  fechaHoy = Date.now();
  dataEleccionesVotos = 0;
  dataElecciones = [];
  loading = false;
  fechaCorte = '';
  constructor(private eleccionesService: EleccionesService) {}

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
     this.dataEleccionesVotos = data.datos
        .map(data => data.intVotos)
        .reduce(function(acc, intVotos) {
          return acc + intVotos;
        }, 0);
      this.dataElecciones = data.datos.map(candidato => {
        candidato.porcentajeReal =
          (candidato.intVotos * 100) / this.dataEleccionesVotos;
        candidato.porcentajeRealStr = candidato.porcentajeReal.toFixed(2);
        candidato.porcentaje = parseFloat(candidato.porcentajeRealStr);
        //candidato.porcentaje = Math.round(candidato.porcentaje);
        console.log("candidato", candidato);
        return candidato;
      });
      this.dataElecciones
        .sort(function(a, b) {
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
