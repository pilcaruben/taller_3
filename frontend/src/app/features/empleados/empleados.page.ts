import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmpleadosService } from '../../core/services/empleados.service';
import { Empleado } from '../../core/models/empleado';
import { EmpleadoFormDialog } from './empleado-form.dialog';

@Component({
  standalone: true,
  selector: 'app-empleados-page',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="p-6 max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-semibold">Gestión de Empleados</h1>
        <button mat-flat-button color="primary" (click)="openCreate()">
          <mat-icon>add</mat-icon>&nbsp;Nuevo
        </button>
      </div>

      <table mat-table [dataSource]="data" class="mat-elevation-z2 w-full">
        <ng-container matColumnDef="nombre">
          <th mat-header-cell *matHeaderCellDef>Nombre</th>
          <td mat-cell *matCellDef="let e">{{ e.nombre }}</td>
        </ng-container>

        <ng-container matColumnDef="cargo">
          <th mat-header-cell *matHeaderCellDef>Cargo</th>
          <td mat-cell *matCellDef="let e">{{ e.cargo }}</td>
        </ng-container>

        <ng-container matColumnDef="departamento">
          <th mat-header-cell *matHeaderCellDef>Departamento</th>
          <td mat-cell *matCellDef="let e">{{ e.departamento }}</td>
        </ng-container>

        <ng-container matColumnDef="sueldo">
          <th mat-header-cell *matHeaderCellDef>Sueldo</th>
          <td mat-cell *matCellDef="let e">{{ e.sueldo | number:'1.2-2' }}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Acciones</th>
          <td mat-cell *matCellDef="let e">
            <button mat-icon-button color="primary" (click)="openEdit(e)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="remove(e)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="cols"></tr>
        <tr mat-row *matRowDef="let row; columns: cols;"></tr>
      </table>
    </div>
  `,
})
export class EmpleadosPage implements OnInit {
  private svc = inject(EmpleadosService);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);

  data: Empleado[] = [];
  cols = ['nombre', 'cargo', 'departamento', 'sueldo', 'actions'];

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.svc.list().subscribe({
      next: (items) => (this.data = items),
      error: () => this.snack.open('Error al cargar empleados', 'OK', { duration: 3000 }),
    });
  }

  openCreate() {
    const ref = this.dialog.open(EmpleadoFormDialog, { data: null, width: '520px' });
    ref.afterClosed().subscribe(ok => ok && this.reload());
  }

  openEdit(emp: Empleado) {
    const ref = this.dialog.open(EmpleadoFormDialog, { data: emp, width: '520px' });
    ref.afterClosed().subscribe(ok => ok && this.reload());
  }

  remove(emp: Empleado) {
    if (!emp._id) return;
    if (!confirm(`¿Eliminar a ${emp.nombre}?`)) return;
    this.svc.delete(emp._id).subscribe({
      next: () => {
        this.snack.open('Empleado eliminado', 'OK', { duration: 2000 });
        this.reload();
      },
      error: () => this.snack.open('No se pudo eliminar', 'OK', { duration: 3000 }),
    });
  }
}
