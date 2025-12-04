// src/constants/prices.ts

export const prices = {
  business: {
    EU: {
      currency: "EUR",
      amount: 49700, // Stripe: Betrag immer in Cent
      priceId: "price_business_eu", 
    },
    CH: {
      currency: "CHF",
      amount: 49700,
      priceId: "price_business_ch",
    },
    INT: {
      currency: "USD",
      amount: 54700,
      priceId: "price_business_int",
    },
  },

  inside25: {
    EU: {
      currency: "EUR",
      amount: 129700,
      priceId: "price_inside25_eu",
    },
    CH: {
      currency: "CHF",
      amount: 129700,
      priceId: "price_inside25_ch",
    },
    INT: {
      currency: "USD",
      amount: 144700,
      priceId: "price_inside25_int",
    },
  },

  inside50: {
    EU: {
      currency: "EUR",
      amount: 199700,
      priceId: "price_inside50_eu",
    },
    CH: {
      currency: "CHF",
      amount: 199700,
      priceId: "price_inside50_ch",
    },
    INT: {
      currency: "USD",
      amount: 214700,
      priceId: "price_inside50_int",
    },
  },

  inside100: {
    EU: {
      currency: "EUR",
      amount: 299700,
      priceId: "price_inside100_eu",
    },
    CH: {
      currency: "CHF",
      amount: 299700,
      priceId: "price_inside100_ch",
    },
    INT: {
      currency: "USD",
      amount: 319700,
      priceId: "price_inside100_int",
    },
  },

  partner: {
    EU: {
      currency: "EUR",
      amount: 116400, // yearly
      priceId: "price_partner_eu",
    },
    CH: {
      currency: "CHF",
      amount: 116400,
      priceId: "price_partner_ch",
    },
    INT: {
      currency: "USD",
      amount: 126400,
      priceId: "price_partner_int",
    },
  },
};
