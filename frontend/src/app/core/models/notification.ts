export class Notification {
  _id: string;
  createdAt: Date;
  content: string;
  type: 'PAIEMENT' | 'PRODUCT' | 'DELIVERY' | 'AGRICULTURE_TIP';
  recipient: string;
  seen: Boolean;
}
