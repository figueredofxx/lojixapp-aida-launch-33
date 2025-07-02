
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  const progress = (currentStep / totalSteps) * 100;
  
  const steps = [
    { number: 1, title: "Cadastro", description: "Dados pessoais" },
    { number: 2, title: "Empresa", description: "Informações da empresa" },
    { number: 3, title: "Plano", description: "Escolha seu plano" },
    { number: 4, title: "Confirmação", description: "Finalizar cadastro" },
  ];

  return (
    <div className="w-full mb-8">
      <div className="mb-4">
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-inter font-medium ${
                step.number <= currentStep
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step.number}
            </div>
            <div className="mt-2 text-center">
              <div className="font-inter text-xs font-medium text-foreground">
                {step.title}
              </div>
              <div className="font-inter text-xs text-muted-foreground">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
