const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const ipg = require('./IPGHPPButton')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.set('view engine', 'ejs');

router.get('/',function(req, res){
    var storename = "YOUR_STORENAMEID";
    var sharedsecret = "YOURSHAREDSECRET";
    var txntype = "sale";
    var chargetotal = "48.42";
    var currency = "484";
    var timezone = "America/Jamaica";
    var responseSuccessURL = "http://localhost:3000/success";
    var responseFailURL = "http://localhost:3000/fail"; //
    
    res.render("index", { 
        MakeButton: ipg.GetPaymentButtonIno(storename, sharedsecret, txntype, chargetotal, currency, timezone, responseSuccessURL, responseFailURL)
    });
});

router.post('/success',function(req, res){
    //console.log(req.body);
    res.send(req.body);
});

router.post('/fail/',function(req, res){
    //console.log(req.body);
    res.send(req.body);
});

app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');
