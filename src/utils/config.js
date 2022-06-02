const GlobalVar = Object.freeze({
  PAY_STACK_KEY: "sk_test_09be553a8653051d040e6fdcdcae44911c634438",
  API_URL:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "https://localhost:44354"
      : "http://api.imdappsoft.com",
});

export default GlobalVar;
