var http = require('https');

exports.search = function(q) {
    var options = {
      hostname: 'api.mercadolibre.com',
      path: '/sites/MLA/search?q='+q,
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      json: true
    };

    return new Promise((resolve, reject) => {
      http.request(options, (response) => {
        var body = '';
        if (response.statusCode!=200) {
          if (response.statusCode==404) {
            reject(Error('El código de producto no existe'))
          } else {
            reject(Error('La operación no se pudo completar '+response.statusCode));
          }
        }
        response.on('data', function(contenido) {
          body += contenido.toString();
        })

        response.on('end', function() {
          var listado = JSON.parse(body);
          resolve(listado);
        })
      }).end();
    })
}
 
exports.getItem = function(itemCode) {
	// Completar el código aquí
	// El request debe ser a https://api.mercadolibre.com/items/:itemCode y luego a 
  // https://api.mercadolibre.com/items/:itemCode/description.json
  var content = ''; 

  var options = {
    hostname: 'api.mercadolibre.com',
    path: '/items/'+itemCode,
    method: 'GET',
    json: true,
    headers: {'Content-Type': 'application/json'}
  } 



  return new Promise((resolve, reject) => {
      http.request(options, (response) => {
        if (response.statusCode!=200) {
          if (response.statusCode==404) {
            reject(Error('El código de producto no existe'))
          } else {
            reject(Error('La operación no se pudo completar '+response.statusCode));
          }
        }
        response.on('data', (data) => {
          content += data;
        });
        response.on('end', () => {
          var content2 = '';       
          options.path = '/items/'+itemCode+'/description.json';
          http.request(options, (response2) => {
            if (response2.statusCode!=200) {
              if (response2.statusCode==404) {
                reject(Error('El código de producto no existe'))
              } else {
                reject(Error('La operación no se pudo completar '+response2.statusCode));
              }
            }

            response2.on('data', (data2) => {
              content2 += data2;
            });

            response2.on('end', () => {
              var response = JSON.parse(content);
              response.description = JSON.parse(content2); // Agrego en text la descripcion del producto
              resolve(response);
            });
          }).end();
        });

    }).end();
  });
}
