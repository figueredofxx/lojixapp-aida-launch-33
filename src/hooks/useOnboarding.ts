
import { useState } from 'react';

export interface OnboardingData {
  // Dados pessoais
  nome: string;
  email: string;
  senha: string;
  
  // Dados da empresa
  nomeEmpresa: string;
  setor: string;
  tamanhoEmpresa: string;
  cidade: string;
  estado: string;
  cnpj?: string;
  telefone: string;
  
  // Plano selecionado
  plano: string;
}

export interface OnboardingState {
  currentStep: number;
  data: OnboardingData;
  isLoading: boolean;
  errors: Record<string, string>;
}

const initialData: OnboardingData = {
  nome: '',
  email: '',
  senha: '',
  nomeEmpresa: '',
  setor: '',
  tamanhoEmpresa: '',
  cidade: '',
  estado: '',
  cnpj: '',
  telefone: '',
  plano: '',
};

export const useOnboarding = () => {
  const [state, setState] = useState<OnboardingState>({
    currentStep: 1,
    data: initialData,
    isLoading: false,
    errors: {},
  });

  const setCurrentStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const updateData = (newData: Partial<OnboardingData>) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, ...newData },
      errors: {}, // Limpa erros ao atualizar dados
    }));
  };

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  };

  const setErrors = (errors: Record<string, string>) => {
    setState(prev => ({ ...prev, errors }));
  };

  const nextStep = () => {
    if (state.currentStep < 4) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  };

  const prevStep = () => {
    if (state.currentStep > 1) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const reset = () => {
    setState({
      currentStep: 1,
      data: initialData,
      isLoading: false,
      errors: {},
    });
  };

  return {
    ...state,
    setCurrentStep,
    updateData,
    setLoading,
    setErrors,
    nextStep,
    prevStep,
    reset,
  };
};
