export interface Notification {
  _id: string;
  createdAt: Date;
  content: string;
  type: 'PAIEMENT' | 'PRODUCT' | 'DELIVERY';
  recipient: string;
  status: 'UNREAD' | 'READ';
}
