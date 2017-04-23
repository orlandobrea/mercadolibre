/*
* @Author: orlando
* @Date:   2017-04-13 20:43:12
* @Last Modified by:   Orlando Brea
* @Last Modified time: 2017-04-18 10:42:45
*/

'use strict';

var express = require('express');
var exphbs  = require('express-handlebars');
var http = require('https');
var service = require('./service');


var app = express();

app.engine('.html', exphbs({defaultLayout: 'main', extname: '.html'}));
app.set('view engine', '.html');

app.use('/static', express.static('static'));


app.get('/', (req, res) => {
    res.render('index', {q: ''});
});

app.get('/mercadolibre/search', (req, res) => {
	if (!req.query.q) {
		res.redirect('/');
	} else {
		service.search(req.query.q).then((listado) => {
			res.render('respuesta', {listado: listado.results, q: req.query.q});
		});
	}
});

app.get('/mercadolibre/view/:id', (req, res) => {
	if (!req.params.id) {
		res.redirect('/');
	} else {

		service.getItem(req.params.id).then((respuesta) => {
			res.render('view', {item: respuesta, q: req.query.q});
		}).catch((err) => {
			console.log("ERROR");
			console.log(err);
		})

	}
});

app.listen(3000, () => {console.log('Esperando peticiones en el puerto 3000')});