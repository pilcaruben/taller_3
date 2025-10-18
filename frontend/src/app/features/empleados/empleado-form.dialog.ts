import { Component, Inject, Optional, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EmpleadosService } from '../../core/services/empleados.service';
import { Empleado } from '../../core/models/empleado';

@Component({
  standalone: true,
  selector: 'app-empleado-form-dialog',
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data?._id ? 'Editar' : 'Nuevo' }} Empleado</h2>
    <form [formGroup]="form" class="p-4" (ngSubmit)="save()">
      <mat-form-field class="w-full" appearance="outline">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="nombre">
      </mat-form-field>

      <mat-form-field class="w-full" appearance="outline">
        <mat-label>Cargo</mat-label>
        <input matInput formControlName="cargo">
      </mat-form-field>

      <mat-form-field class="w-full" appearance="outline">
        <mat-label>Departamento</mat-label>
        <input matInput formControlName="departamento">
      </mat-form-field>

      <mat-form-field class="w-full" appearance="outline">
        <mat-label>Sueldo</mat-label>
        <input matInput type="number" formControlName="sueldo">
      </mat-form-field>

      <div class="mt-4 flex gap-2 justify-end">
        <button mat-button type="button" (click)="close()">Cancelar</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">
          Guardar
        </button>
      </div>
    </form>
  `
})
export class EmpleadoFormDialog {
  private fb = inject(FormBuilder);
  private svc = inject(EmpleadosService);
  private ref = inject<MatDialogRef<EmpleadoFormDialog>>(MatDialogRef);

  form!: FormGroup;

  // @Optional() por si abres el diálogo sin pasar data
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: Empleado | null) {
    const d = data ?? { nombre: '', cargo: '', departamento: '', sueldo: 0 } as Empleado;

    this.form = this.fb.group({
      nombre: [d.nombre, [Validators.required, Validators.minLength(2)]],
      cargo: [d.cargo, [Validators.required]],
      departamento: [d.departamento, [Validators.required]],
      sueldo: [d.sueldo ?? 0, [Validators.required, Validators.min(0)]],
    });
  }

  save() {
    const payload = this.form.value as Empleado;
    if (this.data?._id) {
      this.svc.update(this.data._id, payload).subscribe(() => this.ref.close(true));
    } else {
      this.svc.create(payload).subscribe(() => this.ref.close(true));
    }
  }

  close() { this.ref.close(false); }
}
