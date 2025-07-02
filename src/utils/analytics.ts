
interface AnalyticsEvent {
  event: string;
  step?: number;
  plan?: string;
  company_size?: string;
  sector?: string;
  user_id?: string;
  timestamp?: number;
}

class Analytics {
  private events: AnalyticsEvent[] = [];

  track(event: string, properties?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      timestamp: Date.now(),
      ...properties,
    };

    this.events.push(analyticsEvent);
    console.log('Analytics Event:', analyticsEvent);

    // Aqui você integraria com serviços como Google Analytics, Mixpanel, etc.
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, properties);
    }
  }

  // Eventos específicos do onboarding
  trackOnboardingStart() {
    this.track('onboarding_started', { step: 1 });
  }

  trackStepCompleted(step: number, data?: Record<string, any>) {
    this.track('onboarding_step_completed', { step, ...data });
  }

  trackPlanSelected(plan: string) {
    this.track('plan_selected', { plan });
  }

  trackOnboardingCompleted(data: Record<string, any>) {
    this.track('onboarding_completed', data);
  }

  trackFormError(step: number, field: string, error: string) {
    this.track('form_error', { step, field, error });
  }

  trackDropOff(step: number) {
    this.track('onboarding_dropout', { step });
  }

  // Getter para acessar eventos (útil para debugging)
  getEvents() {
    return this.events;
  }

  // Limpar eventos
  clearEvents() {
    this.events = [];
  }
}

export const analytics = new Analytics();

// Funções de conveniência
export const trackOnboardingStart = () => analytics.trackOnboardingStart();
export const trackStepCompleted = (step: number, data?: Record<string, any>) => 
  analytics.trackStepCompleted(step, data);
export const trackPlanSelected = (plan: string) => analytics.trackPlanSelected(plan);
export const trackOnboardingCompleted = (data: Record<string, any>) => 
  analytics.trackOnboardingCompleted(data);
export const trackFormError = (step: number, field: string, error: string) => 
  analytics.trackFormError(step, field, error);
export const trackDropOff = (step: number) => analytics.trackDropOff(step);
