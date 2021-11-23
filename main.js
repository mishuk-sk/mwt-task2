const app = require("express")();
const port = process.env.PORT;
const { response } = require("express");
const path = require("path");

app.use((req, resp, next) => {
    resp.set('Access-Control-Allow-Origin', '*');
    next();
});

app.get("/", (req, response)=>{
    response.send("<html><body><center><p>Skuratovich</p></center></body></html>");
})
app.get("/login", (req, resp)=>{
    resp.send("Skuratovich");
})
app.get("/promise", (req, resp) => {
    resp.sendFile(path.resolve(__dirname, 'promise.js'));
})
app.get("/promise/:x", (req, resp) => {
    x = req.params['x'];
    prom = (x) => new Promise((res, rej) => { x < 18 ? res('yes') : rej('no')})
    prom(x).then((reason) => resp.send(reason), (reason) => resp.status(400).send(reason))
})
app.get("/fetch", (_, resp) => resp.sendFile(path.resolve(__dirname, 'home.html')))

app.listen(port, ()=>{console.log("listening on %s", port)});