require("dotenv").config();
const axios = require("axios");

// 環境変数からAPIキーと検索キーを取得
const api_key = process.env.OPENAI_API_KEY;
const search_key = process.env.SEARCH_KEY;

// APIの設定
const api_base = "https://oai1-0.openai.azure.com/";
const deployment_id = "deploy0123";
const search_endpoint = "https://search0123.search.windows.net";
const search_index = "index0206-mitani-tel";

// ヘッダー
const headers = {
  "Content-Type": "application/json",
  "api-key": api_key,
};

// ユーザーリクエスト
const user_request = {
  role: "user",
  content: "KCLってなんですか",
};

// リクエストデータ
const data = {
  dataSources: [
    {
      type: "AzureCognitiveSearch",
      parameters: {
        endpoint: search_endpoint,
        indexName: search_index,
        semanticConfiguration: null,
        queryType: "simple",
        fieldsMapping: {
          contentFieldsSeparator: "\n",
          contentFields: ["content"],
          filepathField: "metadata_storage_name",
          titleField: null,
          urlField: "metadata_storage_path",
          vectorFields: [],
        },
        inScope: true,
        roleInformation: "",
        filter: null,
        strictness: 3,
        topNDocuments: 5,
        key: search_key,
      },
    },
  ],
  messages: [
    {
      role: "system",
      content:
        "あなたは九州工業大学のホームページに埋め込まれたチャットボットです。データソースに基づき、ユーザーからの問い合わせに対して日本語で応答してください。",
    },
    user_request,
    user_request,
    user_request,
  ],
  deployment: deployment_id,
  temperature: 0.5,
  top_p: 0.95,
  max_tokens: 800,
  stop: null,
  stream: false,
};

// POSTリクエストの実行
axios
  .post(
    `${api_base}/openai/deployments/${deployment_id}/extensions/chat/completions?api-version=2023-08-01-preview`,
    data,
    { headers: headers }
  )
  .then((response) => {
    console.log(response.data.choices[0].message.content);
  })
  .catch((error) => {
    console.error(error);
  });
