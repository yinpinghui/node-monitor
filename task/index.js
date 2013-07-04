var loadtask = function(app) {
	var db = app.get("sqlite");
	db.serialize(function() {
		db.run("CREATE TABLE IF NOT EXISTS task (info TEXT)");
		db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");
		db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");
		db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");
		db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");
		db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");
		var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
		for (var i = 0; i < 10; i++) {
			stmt.run("Ipsum " + i);
		}
		stmt.finalize();

		db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
			console.log(row.id + ": " + row.info);
		});
	});

	db.close();
}
