// src/components/wizard/stepConfig.tsx
import Step1TipoDocumento from './steps/Step1TipoDocumento';
import Step2PersonalInfo from './steps/Step2PersonalInfo';
import Step3Entidad from './steps/Step3Entidad';
import Step4Detalles from './steps/Step4Detalles';
import { FormData } from '../../types/formTypes';

export interface StepComponentProps {
  onNext: () => void;
  onBack: () => void;
  formData: FormData;
  handleChange: (field: string, value: string) => void;
}

export interface StepConfig {
  id: string;
  label: string;
  Component: React.FC<StepComponentProps>;
  icon?: React.ReactNode;
}

export const steps: StepConfig[] = [
  {
    id: 'tipoDocumento',
    label: 'Tipo de documento',
    Component: Step1TipoDocumento,
    icon: 
      (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    )
  },
  {
    id: 'cliente',
    label: 'Datos personales',
    Component: Step2PersonalInfo,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
    )
  },
  {
    id: 'entidad',
    label: 'Entidad',
    Component: Step3Entidad,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
      </svg>
    )
  },
  {
    id: 'detalles',
    label: 'Detalles',
    Component: Step4Detalles,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
      </svg>
    )
  },
];