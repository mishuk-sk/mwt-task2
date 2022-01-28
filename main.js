const app = require("express")();
const port = process.env.PORT;
const { response } = require("express");
const path = require("path");

app.disable('etag');

app.use((req, resp, next) => {
    resp.set('Access-Control-Allow-Origin', '*');
    next();
});

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
});

app.get("/", (req, response)=>{
    response.status(500).send('<html><body style="background-color: blue"><center><p style="color:red">Не понял - ошибка  500 (Internal Server Error)</p></center></body></html>');
})
app.get("/login", (req, resp)=>{
    resp.set('Content-Type', "text/plain");
    resp.send("Skuratovich");
})
app.get("/login/1", (req, resp)=>{
    resp.writeHeader(200, { 'Content-Type': 'application/json' })
    resp.write(JSON.stringify("Skuratovich"))
})
app.get("/login/2", (req, resp)=>{
    resp.set('Content-Type', "application/json; charset=utf-8");
    resp.send('"Skuratovich"');
})
app.get("/login/code1", (req, resp)=>{
    resp.send('<html><body><center><p style="font-size: 21px; font-weight:900">Skuratovich`s</p></center></body></html>');
})
app.get("/login/code2", (req, resp)=>{
    resp.set('Content-Type', "text/plain");
    resp.send('<html><body><center><p style="font-size: 21px; font-weight:900">Skuratovich`s</p></center></body></html>');
})
app.get("/promise", (req, resp) => {
    resp.sendFile(path.resolve(__dirname, 'promise.js'));
})
app.get("/promise/:x", (req, resp) => {
    x = req.params['x'];
    prom = (x) => new Promise((res, rej) => { x < 13 ? res('yes') : rej('no')})
    prom(x).then((reason) => resp.send(reason), (reason) => resp.status(400).send(reason))
})
app.get("/fetch", (_, resp) => resp.sendFile(path.resolve(__dirname, 'home.html')))
app.get("*", (req, response) => {
    response.status(404).send('<html><body style="background-color: yellow"><center><p style="color:red">Ужас - ошибка 404 (не найдено)</p></center></body></html>');
})

app.listen(port, ()=>{console.log("listening on %s", port)});
