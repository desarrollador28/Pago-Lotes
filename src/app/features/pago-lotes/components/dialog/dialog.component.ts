import { Component, Input, OnInit } from '@angular/core';
import { TableDialog, Column } from './interfaces/dialog.interface';


@Component({
  selector: 'pago-lotes-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit{
  @Input() tableData: TableDialog = { 
    label: '',
    roudend: false,
    isSearch: false,
    title: ''
  };

  public visible: boolean = false;
  public products!: any[];
  public cols!: Column[];

  ngOnInit() {
    this.products = [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
    },
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
    },
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
    },
    ]

    this.showColumns();
  }

  showDialog(): void {
    this.visible = true;
  }

  showColumns(): void {
    if(this.tableData.isSearch) {
      this.cols = [
        { field: 'code', header: 'Cod. Cliente' },
        { field: 'name', header: 'Nombre del Cliente' },
        { field: 'category', header: 'RFC Cliente' },
      ];
    } else {
      this.cols = [
        { field: 'code', header: '' },
        { field: 'name', header: 'No. Documentos' },
        { field: 'category', header: 'Factura' },
        { field: 'quantity', header: 'Tipo Documento' },
        { field: 'quantity', header: 'Monto Documento' },
      ];
    }
  }
}
