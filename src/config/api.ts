const API_DOMAIN = import.meta.env.API_DOMAIN;

export const BEARER_TOKEN = "PrainyHere" as const;

export const API_ENDPOINTS = {
  monthlyRecords: {
    uri: `${API_DOMAIN}/v1.0/Prainy/monthRecords`,
    method: "GET",
  },
  createRecord: {
    uri: `${API_DOMAIN}/v1.0/Prainy/accounting`,
    method: "POST",
  },
} as const;
