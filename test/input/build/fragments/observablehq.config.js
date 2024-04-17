export default {
  head: (data) => JSON.stringify({hello: "head", data}),
  header: (data) => `
  ${data.author ? `<div class="byline">${data.author}</div>`: ""}
  ${data.date instanceof Date ? `<div class="date">${data.date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "utc"
  })}</div>` : ""}
  `,
  footer: (data) => JSON.stringify({hello: "footer", data}),
};
