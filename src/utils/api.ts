
import { OnboardingData } from "@/hooks/useOnboarding";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export const submitOnboardingData = async (data: OnboardingData): Promise<ApiResponse> => {
  try {
    // Simular chamada para API
    const response = await fetch('/api/onboarding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erro ao processar cadastro');
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Erro na API:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    };
  }
};

export const sendConfirmationEmail = async (email: string): Promise<ApiResponse> => {
  try {
    const response = await fetch('/api/send-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar email');
    }

    return { success: true };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro ao enviar email' 
    };
  }
};

export const checkEmailAvailability = async (email: string): Promise<ApiResponse<{ available: boolean }>> => {
  try {
    const response = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
    
    if (!response.ok) {
      throw new Error('Erro ao verificar email');
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Erro ao verificar email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro ao verificar email' 
    };
  }
};
