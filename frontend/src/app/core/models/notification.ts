export interface Notification {
  _id: string;
  createdAt: Date;
  content: string;
  type: 'PAIEMENT' | 'PRODUCT' | 'DELIVERY';
  recipient: {
    _id: string;
    username: string;
  };
  status: 'UNREAD' | 'READ';
}
