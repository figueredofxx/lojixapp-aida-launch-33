
import { useState, useEffect } from 'react';

export interface Product {
  id: string;
  nome: string;
  categoria: string;
  marca: string;
  precoVenda: string;
  controlType: 'quantidade' | 'identificador';
  estoqueMinimo?: string;
  garantiaDias?: string;
  descricao?: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      nome: 'iPhone 15 Pro Max',
      categoria: 'Smartphones',
      marca: 'Apple',
      precoVenda: 'R$ 8.999,00',
      controlType: 'identificador',
      estoqueMinimo: '5',
      garantiaDias: '365'
    },
    {
      id: '2',
      nome: 'Samsung Galaxy A54',
      categoria: 'Smartphones',
      marca: 'Samsung',
      precoVenda: 'R$ 1.899,00',
      controlType: 'quantidade',
      estoqueMinimo: '10',
      garantiaDias: '365'
    },
    {
      id: '3',
      nome: 'Capinha Transparente',
      categoria: 'Acessórios',
      marca: 'Genérica',
      precoVenda: 'R$ 29,90',
      controlType: 'quantidade',
      estoqueMinimo: '50',
      garantiaDias: '90'
    }
  ]);

  const [loading, setLoading] = useState(false);

  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) return [];
    
    return products.filter(product => 
      product.nome.toLowerCase().includes(query.toLowerCase()) ||
      product.categoria.toLowerCase().includes(query.toLowerCase()) ||
      product.marca.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  return {
    products,
    loading,
    searchProducts,
    getProductById
  };
};
