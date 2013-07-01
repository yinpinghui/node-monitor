exports.log = function(req,res){
	console.log("")
	res.end();
}
exports.index = function(req, res) {
	res.render('index', {
		title : 'Express'
	});
};