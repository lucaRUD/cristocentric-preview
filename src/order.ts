export interface OrderData {
  merchantReference: string;
  shippingMethod: string;
  recipient: {
    name: string;
    address: {
      line1: string;
      line2?: string;
      postalOrZipCode: string;
      countryCode: string;
      townOrCity: string;
      stateOrCounty?: string;
    };
  };
  items: Array<{
    merchantReference: string;
    sku: string;
    copies: number;
    sizing?: string;
    attributes?: {
      [key: string]: any;
    };
    recipientCost?: {
      amount: string;
      currency: string;
    };
    assets?: Array<{
      printArea?: string;
      url: string;
      md5Hash?: string;
    }>;
  }>;
  metadata?: {
    [key: string]: any;
  };
}
