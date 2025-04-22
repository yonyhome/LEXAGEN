import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface FormData {
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

interface FormContextProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
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
  entidad: ''
};

export const FormContext = createContext<FormContextProps>({
  formData: defaultData,
  setFormData: () => {},
});

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Leer los datos iniciales desde sessionStorage, en caso de que existan.
  const storedData = sessionStorage.getItem('lexagenFormData');
  const initialData = storedData ? JSON.parse(storedData) : defaultData;

  const [formData, setFormData] = useState<FormData>(initialData);

  // Cada vez que formData cambie, se actualiza en sessionStorage.
  useEffect(() => {
    sessionStorage.setItem('lexagenFormData', JSON.stringify(formData));
  }, [formData]);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
