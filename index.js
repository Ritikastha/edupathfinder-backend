
const app = require("./app");
const port = 5005;
const fs = require('fs');
const key = fs.readFileSync('./cert/localhost.decrypted.key');
const cert = fs.readFileSync('./cert/localhost.crt');


const https = require('https');
const server = https.createServer({ key, cert }, app);


server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
