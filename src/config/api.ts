const API_DOMAIN = import.meta.env.API_DOMAIN;

export const BEARER_TOKEN = "PrainyHere" as const;

export const API_ENDPOINTS = {
  records: `${API_DOMAIN}/records`,
  createRecord: {
    uri: `${API_DOMAIN}/v1.0/Prainy/accounting`,
    method: "POST",
  },
} as const;
