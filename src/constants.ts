// console.log("PROCESS ENV", process.env);

// const apiDomain = process.env.PUBLIC_API_URL;

const apiDomain = import.meta.env.PUBLIC_API_URL;

export const apiUrl =
  apiDomain != null ? `https://${apiDomain}` : "http://localhost:4000";
