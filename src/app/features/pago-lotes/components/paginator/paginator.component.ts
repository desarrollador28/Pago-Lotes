import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paginator } from '../../../../shared/helpers/paginator.helper';
import { PaginatorState } from 'primeng/paginator';
import { TablePageEvent } from 'primeng/table';

@Component({
  selector: 'pago-lotes-paginator',
  standalone: false,
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit {
  @Input() paginator: Paginator = new Paginator();
  @Output() onPageEvent: EventEmitter<TablePageEvent> = new EventEmitter<TablePageEvent>();
  public rowsPerPageOptions: number[] = [5, 10, 15, 20];

  ngOnInit(): void {
  }

  pageChange(event: PaginatorState): void {
    this.onPageEvent.emit({
      first: event.first ?? 0,
      rows: event.rows ?? 10
    });
  }

}
