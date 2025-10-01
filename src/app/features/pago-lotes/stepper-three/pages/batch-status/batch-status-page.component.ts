import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FacturasService } from '../../../../../core/services/pago-lotes/facturas.service';
import { GetBatchStatus } from '../../../../../core/services/pago-lotes/interfaces/pago-lotes.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pago-lotees-batch-status',
  standalone: false,
  templateUrl: './batch-status-page.component.html',
  styleUrl: './batch-status-page.component.css'
})
export class BatchStatusPageComponent implements OnInit, OnChanges {
  @Input() batchId: number = 0;
  public id: number = 0;
  public formBatch!: FormGroup;
  private regexpDigito: RegExp = /\d+/;
  public batch: GetBatchStatus = {
    status: {
      isSuccess: false,
      statusCode: 0,
      message: ''
    },
    payload: {
      batchId: 0,
      total: 0,
      running: 0,
      state: 0,
      succeeded: 0,
      failed: 0,
      difference: null
    }
  };
  constructor(private facturasService: FacturasService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.initForm();

    if (this.batchId !== 0) this.getBatchStatus(this.batchId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['batchId']) return;

    if (this.batchId !== 0) this.getBatchStatus(this.batchId);

  }


  private initForm(): void {
    this.formBatch = this.fb.group({
      batchId: [null, [Validators.required, Validators.pattern(this.regexpDigito)]],
      state: [0],
      total: [null],
      succeeded: [null],
      failed: [null],
      running: [null],
      difference: [null],
    })
  }

  searchBatch(): void {
    if (this.formBatch.invalid) {
      this.formBatch.markAllAsTouched();
      return;
    }

    const control = this.formBatch.get('batchId');

    if (!control) return;


    this.getBatchStatus(control.value);
  }

  getBatchStatus(id: number): void {
    this.facturasService.getBatchStatus(id).subscribe({
      next: (response) => {
        this.formBatch.setValue(response.payload);
      },
      error: (err) => {
        console.log('Error en obtener status de facturas:', err)
      }
    })
  }

}
