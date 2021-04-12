import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICNERequest } from 'src/app/models';
import { EleccionesService } from '../../services/elecciones.service';
import { DomSanitizer } from '@angular/platform-browser';
import { replaceAll } from 'src/app/shared/utils';
import { IDatoCNE } from '../../models/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-elecciones-segunda-vuelta',
  templateUrl: './elecciones-segunda-vuelta.component.html',
  styleUrls: ['./elecciones-segunda-vuelta.component.scss']
})
export class EleccionesSegundaVueltaComponent implements OnInit, OnDestroy {

  fechaHoy = Date.now();
  dataEleccionesVotos = 0;
  dataElecciones: IDatoCNE[] = [];
  loading = false;
  fechaCorte = '';
  diferenciaVotos = 0;
  diferenciaPorcentaje = 0;
  datosEstadisticos: any = null;
  suscription = new Subscription();

  constructor(
    private eleccionesService: EleccionesService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }
  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
  cargarDatos() {
    this.loading = true;
    this.suscription = this.eleccionesService.getDataApiSegunda().subscribe((data: ICNERequest) => {
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

    this.dataElecciones = this.dataElecciones
      .sort(function (a, b) {
        const keyA = a.porcentaje,
          keyB = b.porcentaje;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      })
      .reverse();

    this.diferenciaVotos = this.dataElecciones[0]?.intVotos -
      this.dataElecciones[1]?.intVotos;
    this.diferenciaPorcentaje = this.dataElecciones[0]?.porcentaje -
      this.dataElecciones[1]?.porcentaje;

    this.diferenciaPorcentaje = parseFloat(this.diferenciaPorcentaje.toFixed(2));
  }


}
