var express = require('express');
const Sequence = require('../resources/sequence')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Signals' });
});

router.post('/', function(req, res, next) {
	try {
		let object_req = req.body
		let post_type = object_req.type
		let fn = new Sequence(object_req.fn, object_req.fnP)
		let gn = object_req.gn;
		if(typeof object_req.gn !== 'number')
			gn = new Sequence(object_req.gn, object_req.gnP);
		let resSeq = 'Error';
		if (post_type === 'suma')
			resSeq = fn.add(gn);
		else if (post_type === 'resta')
			resSeq = fn.sub(gn);
		else if (post_type === 'mul')
			resSeq = fn.mul(gn);
		else if (post_type === 'inter')
			resSeq = fn.inteSequence(gn, object_req.inter);
		else if (post_type === 'desmi')
			resSeq = fn.deciSequence(gn);
		else if (post_type === 'convo')
			resSeq = fn.conSequence(gn);
		else if (post_type === 'despl')
			resSeq = fn.add(gn);
		else if (post_type === 'ampl')
			resSeq = fn.mul(gn);
		else if (post_type === 'neq')
			resSeq = fn.neq();

        // if (post_type === 'convo' && object_req.numPeriodics > 0){
        //         let tem_ = null;
        //         let indexZero = Math.abs(resSeq.lower);
        //         console.log(resSeq.getString)
        //         if (object_req.numPeriodics == 1) {
        //             let indexAux = 0, topIndex = Math.min(fn.getLength, gn.getLength);
        //             tem_ = new Array(topIndex).fill(0);
        //             for (let index = resSeq.lower; index <= resSeq.upper; index++) {
        //                 tem_[indexAux++] += resSeq.sequence[index];
        //                 indexAux = (indexAux >= topIndex)? 0: indexAux;
        //             }
        //         }else{
        //             let indexAux = 0, topIndex = Math.max(fn.getLength, gn.getLength);
        //             tem_ = new Array(topIndex).fill(0);
        //             for (let index = resSeq.lower; index <= resSeq.upper; index++) {
        //                 tem_[indexAux++] += resSeq.sequence[index];
        //                 indexAux = (indexAux >= topIndex)? 0: indexAux;
        //             }
        //         }
        //         tem_[indexZero] = '(' + tem_[indexZero] + ')';
        //         resSeq = '[' + tem_.join(' ') + ']';
        //     }else{
        //         resSeq = resSeq.getString;
        //     }

		res.json({'res': resSeq.getString, 'fn': fn.sequence, 'gn': gn.sequence, resS:resSeq.sequence});
			
	} catch (error) {
		console.log(error)
	}

		
});


module.exports = router;
