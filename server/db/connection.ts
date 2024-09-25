const isProd = process.env.NODE_ENV === "production";

export const dbUrl = isProd
  ? process.env.DATABASE_URL!
  : process.env.DATABASE_PUBLIC_URL!;
