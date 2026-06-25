const env = {
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
  poe: {
    clientId: process.env.NEXT_PUBLIC_POE_CLIENT_ID!,
  },
};

export default env;
