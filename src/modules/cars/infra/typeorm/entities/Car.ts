import { v4 as uuid } from "uuid";

class Car {
  id: string;

  name: string;

  description: string;

  brand: string;

  daily_rate: number;

  fine_amount: number;

  available: boolean;

  license_plate: string;

  created_at: Date;

  category_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.available = true;
      this.created_at = new Date();
    }
  }
}

export default Car;
