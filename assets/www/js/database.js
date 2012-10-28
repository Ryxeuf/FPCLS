var db;

function initDB(){
	db = window.openDatabase("bdd", "1.0", "bdd", 1000000);
	db.transaction(setup, errorHandler, dbReady);
}

function setup(tx){
	tx.executeSql('create table if not exists log(id INTEGER PRIMARY KEY AUTOINCREMENT, log TEXT, created DATE)');
}

function errorHandler(e){
	alert(e.message);
}

function addDB(){
	db.transaction(function(tx){
		var msg = "Log it...";
		var d = new Date();
	//	d.setDate(d.getDate() - randRange(1, 30));
		tx.executeSql("insert into log(log, created) values(?,?)", [msg, d.getTime()]);
	}, errorHandler, function(){ /*$("#result").html("Ligne ajoutee.");*/ });
}

function logDB(msg){
	db.transaction(function(tx, msg){
		var d = new Date();
		tx.executeSql("insert into log(log, created) values(?,?)", [msg, d.getTime()]);
	}, errorHandler, function(){ /*$("#result").html("Ligne ajoutee.");*/ });
}

function cleanDB(){
	db.transaction(function(tx){
		tx.executeSql("delete from log");
	}, errorHandler, function(){ /*$("#result").html("Base videe.");*/ });
}

function dbReady(){}

