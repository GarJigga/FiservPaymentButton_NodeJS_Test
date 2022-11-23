var CryptoJS = require("crypto-js");

function _MakeDate(){
    var d = new Date;
    return [
        d.getFullYear(),
        d.getMonth()+1,
        d.getDate()            
    ].join(':')+'-'+
    [
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
    ].join(':');
}

module.exports = {
    GetPaymentButtonIno: function(storename, sharedSecret, txntype, chargetotal, currency, timezone, responseSuccessURL, responseFailURL){
		var txndatetime = _MakeDate();
        var arrInputs = {
            storename: storename,
            chargetotal: chargetotal,
            currency: currency,
            txndatetime: txndatetime,
            timezone: timezone,
            txntype: txntype,
            responseSuccessURL: responseSuccessURL,
            responseFailURL: responseFailURL,
            authenticateTransaction: "true",
            checkoutoption: "combinedpage",
            hash_algorithm: "HMACSHA256",
            language: "en_US",
            threeDSRequestorChallengeIndicator:"01"

        };

        var arrkeys = Object.keys(arrInputs);
        arrkeys = arrkeys.sort();
        var messageSignatureContent = [];
        for(var s = 0;s < arrkeys.length;s++){
            messageSignatureContent.push(arrInputs[arrkeys[s]]);
        }
        var contenttohash = messageSignatureContent.join("|");
        const messageSignature = CryptoJS.HmacSHA256(contenttohash, sharedSecret);
		const messageSignatureBase64 = CryptoJS.enc.Base64.stringify(messageSignature);
        
        arrInputs['hashExtended'] = messageSignatureBase64;
        return arrInputs;
    }
};