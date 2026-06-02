/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // in BRL
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  store: string;
  image: string;
  description: string;
  inStock: boolean;
  stockCount: number;
  isOffer?: boolean;
  offerTag?: string;
  specs?: Record<string, string>;
  colors?: string[];
  capacities?: string[];
}

export interface Store {
  id: string;
  name: string;
  category: string;
}

export interface TransitMilestone {
  label: string;
  status: 'pending' | 'active' | 'completed';
}

export interface Order {
  id: string;
  productName: string;
  origin: string;
  destination: string;
  weight: number; // kg
  shippingFee: number; // in BRL
  totalValue: number;
  status: 'Pago' | 'Aguardando Freteiro' | 'Em Trânsito' | 'Entregue';
  timeAgo: string;
  buyerName?: string;
  buyerImage?: string;
  courierName?: string;
  courierImage?: string;
  progressPercent?: number; // 0 to 100 for path progress
}

export interface ApprovalRequest {
  id: string;
  name: string;
  type: 'LOJA' | 'FRETEIRO';
  documentId: string; // CNPJ / Driver document
  detail: string; // detail type
  date: string;
  status: 'pending' | 'approved';
}

export interface TaxConfig {
  marketplaceFee: number; // %
  logisticsFee: number; // %
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedCapacity?: string;
}
