import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function httpYahooApi(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const requestData = JSON.parse(await request.text());
  const number = requestData.jancode;

  async function fetchname() {
    const YAHOO_API_KEY =
      "dj00aiZpPUtQZkFXT0dLdFE3WCZzPWNvbnN1bWVyc2VjcmV0Jng9MmE-";
    try {
      const res = await fetch(
        `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=${YAHOO_API_KEY}&jan_code=${number}`
      );
      if (!res.ok) {
        console.log(Error);
        throw new Error("fetchに失敗しました");
      }
      const data = await res.json();
      console.log(data);
      const name = data.hits[0].name;
      return name;
    } catch (error) {
      console.error("エラーです:", error);
      return error;
    }
  }

  const RedBull = await fetchname();

  return { body: JSON.stringify(RedBull) };
}

app.http("httpYahooApi", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: httpYahooApi,
});
