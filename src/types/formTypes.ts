// src/types/formTypes.ts

export interface FormData {
    contactoEntidad: string;
    direccionEntidad: string;
    direccion: string;
    ciudad: any;
    entidad: any;
    contacto: any;
    nombre: string;
    identificacion: string;
    tipoDocumento: string;
    detalles: string;
}
  

export const defaultData: FormData = {
    nombre: '',
    identificacion: '',
    tipoDocumento: '',
    detalles: '',
    contacto: '',
    contactoEntidad: '',
    direccionEntidad: '',
    direccion: '',
    ciudad: '',
    entidad: '',
};
  