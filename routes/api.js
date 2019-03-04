require('dotenv').config();
var express = require('express');
var router = express.Router();
var qr = require('qr-image');

router.get('/', (req, res, next) => {
	res.json({
		status: 200,
		message: 'Welcome to My API.'
	});
});

router.get('/generate', async (req, res, next) => {
	if(req.query.t){
		var text = req.query.t;
	}	else {
		var text = 'qr' + Date.now();
	}

	var qr_svg = qr.image(text, { type: 'png', margin: 2 });
	var filename = 'qr' + Date.now();
	qr_svg.pipe(require('fs').createWriteStream('public/images/' + filename + '.png'));
	
	res.json({
		status: 200,
		message: 'QRCode has been generated.',
		data: {
			link: process.env.APP_URL + '/images/' + filename + '.png'
		}
	})
});

module.exports = router;
