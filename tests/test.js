

var service = require('../service');
var expect = require('chai').expect;
var nock = require('nock');



describe('Service', function() {
	
	it('Validar que retorne el producto', function() {
		nock('https://api.mercadolibre.com')
					.get('/items/MLA609126692')
					.reply(200, 
						{	
							id: 'propiedad esperada'
						}
					);
		nock('https://api.mercadolibre.com')
					.get('/items/MLA609126692/description.json')
					.reply(200, 
						{	
							id: 'propiedad esperada'
						}
					);

		return service.getItem('MLA609126692').then((contenido) => {
			expect(contenido).property('id');
		})
	});

	it('Validar que NO retorne un producto que no existe', function() {
		var mockServer = nock('https://api.mercadolibre.com')
					.get('/items/MLA6091266929')
					.reply(404, 
						{}
					);
		return service.getItem('MLA6091266929').then((contenido) => {
			expect(true).false;
		}, (err) => {
			expect(err).property('message');

		});
	});

});

