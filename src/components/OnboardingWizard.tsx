
import { useOnboarding } from "@/hooks/useOnboarding";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "./ProgressIndicator";
import RegistrationForm from "./RegistrationForm";
import CompanyDataForm from "./CompanyDataForm";
import PlanSelection from "./PlanSelection";
import ConfirmationStep from "./ConfirmationStep";

const OnboardingWizard = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    data,
    isLoading,
    updateData,
    nextStep,
    prevStep,
    setLoading,
  } = useOnboarding();

  const handleFinish = async () => {
    setLoading(true);
    
    try {
      // Aqui você faria a chamada para a API para salvar os dados
      console.log('Dados do onboarding:', data);
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirecionar para o dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao finalizar onboarding:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <RegistrationForm
            data={data}
            onUpdate={updateData}
            onNext={nextStep}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <CompanyDataForm
            data={data}
            onUpdate={updateData}
            onNext={nextStep}
            onPrev={prevStep}
            isLoading={isLoading}
          />
        );
      case 3:
        return (
          <PlanSelection
            data={data}
            onUpdate={updateData}
            onNext={nextStep}
            onPrev={prevStep}
            isLoading={isLoading}
          />
        );
      case 4:
        return (
          <ConfirmationStep
            data={data}
            onFinish={handleFinish}
            onPrev={prevStep}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-cantarell text-4xl font-bold text-foreground mb-2">
            LojixApp
          </h1>
          <p className="font-inter text-lg text-muted-foreground">
            Gestão empresarial completa para o seu negócio
          </p>
        </div>
        
        <ProgressIndicator currentStep={currentStep} totalSteps={4} />
        
        <div className="mt-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
