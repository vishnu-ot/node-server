const http = require("http");
const fs = require("fs");
const { parse } = require("querystring");
const PORT = 3006;
var querystring = require("querystring");
let users = [
  { id: 1, name: "Vishnu" },
  { id: 2, name: "Jinu" },
  { id: 3, name: "Sajeev" },
  { id: 4, name: "Raju" },
  { id: 5, name: "Dipin" },
];

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );

  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "application/json" });
      let response = {
        data: "This is home page and this content is from backend",
      };

      return res.end(JSON.stringify(response));

    case "/users":
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(users));

    case "/addData":
      const chunks = [];
      let stringData;
      req.on("data", (chunk) => {
        chunks.push(chunk);
      });
      return req.on("end", () => {
        console.log("all parts/chunks have arrived");
        const data = Buffer.concat(chunks);
        console.log("Data: ", data.length);
        stringData = data.toString();
        console.log("stringData: ", stringData);

        stringData = stringData.replace(/[{}\n"]/g, "");
        let newObj = {
          id: Date.now(),
          name: stringData,
        };

        users.push(newObj);
        res.end(JSON.stringify(users));
      });

    case "default":
      console.log("invalid path");
  }
});

server.listen(PORT, () => console.log("server running...."));
