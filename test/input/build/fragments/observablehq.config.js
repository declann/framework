export default {
  head: (data) => JSON.stringify({hello: "head", data}),
  header: (data) => JSON.stringify({hello: "header", data}),
  footer: (data) => JSON.stringify({hello: "footer", data}),
};
