import { Component } from '@angular/core';
import { TableDialog } from '../../components/dialog/interfaces/dialog.interface';

@Component({
  selector: 'pago-lotes-documentos-cobranza-page',
  standalone: false,
  templateUrl: './documentos-cobranza-page.component.html',
  styleUrl: './documentos-cobranza-page.component.css'
})
export class DocumentosCobranzaPageComponent {
  public searchTable: TableDialog = {
    label: '',
    roudend: true,
    icon: 'pi pi-search',
    isSearch: true,
    title: 'Buscar clientes'
  }

  public facturas: TableDialog = {
    label: 'Facturas',
    roudend: false,
    isSearch: false,
    title: 'Importa a Aplicar'
  }
}
