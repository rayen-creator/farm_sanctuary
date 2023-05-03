export enum eventType {
  PLANTING = 'PLANTING',
  HARVESTING = 'HARVESTING',
  FERTILISER_APPLICATION = 'FERTILISER_APPLICATION',
  LIVESTOCK_CARE = 'LIVESTOCK_CARE',
  PEST_CONTROL = 'PEST_CONTROL',
  IRRIGATION = 'IRRIGATION',
  CROP_ROTATION = 'CROP_ROTATION',
}

export class Event {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  type: eventType;
}
