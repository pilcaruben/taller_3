import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EmpleadosService {
  private http = inject(HttpClient);
  private base = `${environment.apiBaseUrl}/empleados`;

  // Estado local reactivo con signals (opcional pero moderno)
  empleados = signal<Empleado[]>([]);
  loading = signal<boolean>(false);

  list() {
    this.loading.set(true);
    return this.http.get<Empleado[]>(this.base);
  }

  getById(id: string) {
    return this.http.get<Empleado>(`${this.base}/${id}`);
  }

  create(data: Omit<Empleado, '_id' | 'createdAt' | 'updatedAt'>) {
    return this.http.post<Empleado>(this.base, data);
  }

  update(id: string, data: Partial<Empleado>) {
    return this.http.put<Empleado>(`${this.base}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
