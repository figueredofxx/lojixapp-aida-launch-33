
export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email é obrigatório';
  if (!emailRegex.test(email)) return 'Email inválido';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Senha é obrigatória';
  if (password.length < 8) return 'Senha deve ter pelo menos 8 caracteres';
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return 'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número';
  }
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim() === '') {
    return `${fieldName} é obrigatório`;
  }
  return null;
};

export const validateCNPJ = (cnpj: string): string | null => {
  if (!cnpj) return null; // CNPJ é opcional
  
  // Remove formatação
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  
  if (cleanCNPJ.length !== 14) {
    return 'CNPJ deve conter 14 dígitos';
  }
  
  // Validação básica - aqui você pode implementar a validação completa do CNPJ
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone) return 'Telefone é obrigatório';
  
  // Remove formatação
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length < 10 || cleanPhone.length > 11) {
    return 'Telefone deve conter 10 ou 11 dígitos';
  }
  
  return null;
};

export const formatCNPJ = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  return cleanValue
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .substring(0, 18);
};

export const formatPhone = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length <= 10) {
    return cleanValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    return cleanValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
};
