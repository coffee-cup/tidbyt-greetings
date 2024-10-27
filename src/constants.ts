const apiDomain = import.meta.env.PUBLIC_API_URL;

export const apiUrl =
  apiDomain != null ? `https://${apiDomain}` : "http://localhost:4000";
