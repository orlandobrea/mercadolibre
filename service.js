//var templateEngine = require('./miRenderEngine');
var http = require('https');

function httpGetRequest(url) {
  var content = ''; 
  var options = {
    hostname: 'api.mercadolibre.com',
    path: url,
    method: 'GET',
    json: true,
    headers: {'Content-Type': 'application/json'}
  } 
  return new Promise((resolve, reject) => {
      http.request(options, (response) => {
        if (response.statusCode!=200) {
          if (response.statusCode==404) {
            reject(Error('No se encontro la pagina'))
          } else {
            reject(Error('La operación no se pudo completar '+response.statusCode));
          }
        }
        response.on('data', (data) => {
          content += data;
        });
        response.on('end', () => {
          resolve(JSON.parse(content));
        });

    }).end();
  });

}


module.exports.search = function(q) {
  return httpGetRequest('/sites/MLA/search?q='+q);
}

 
function getItem(itemCode) {
  return httpGetRequest('/items/'+itemCode);
}

function getItemDescription(itemCode) {
  return httpGetRequest('/items/'+itemCode+'/description');
}

module.exports.getItem = function(itemId) {
  return new Promise((resolve, reject) => {
    Promise.all([
        getItem(itemId),
        getItemDescription(itemId)
      ]).then(content => {
        var objItem = content[0];
        objItem.text = content[1].text;
        resolve(objItem);
      }).catch(e => {
        reject(e);
      })
  });
}

