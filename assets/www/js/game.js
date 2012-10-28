var choices;
var wins;
var looses;
var draw;
var lastwin;
var lastplayed;
var lastversus;
var nbplayers;
var turn;
var playerturn;
var player1;
var player2;

function newGame(nbplayer){
	choices = new Array();
	choices["1"] = "paper";
	choices["2"] = "rock";
	choices["3"] = "scisors";
	choices["4"] = "lizard";
	choices["5"] = "spock";
	
	wins=0;
	looses=0;
	lastwin=false;
	draw=false;
	lastplayed=0;
	lastversus=0;
	nbplayers=nbplayer;
	turn=1;
	playerturn="Joueur 1";
	player1 = "Joueur 1";
	if(nbplayers == 1){
		player2 = "IA";
	}else{
		player2 = "Joueur 2";
	}
}

function getIAChose(){
	return Math.floor(Math.random()*5)+1;
}

function playTurn(choix){
	if(turn == 1){
		lastplayed = choix;
	}else if(turn == 2){
		lastversus = choix;
	}
	
	if(nbplayers == 1){
		lastversus = getIAChose();
	}else if(nbplayers == 2 && turn == 1){
		turn = 2;
		$("#joueurname").html(player2);
		alert(player2);
		return $.mobile.changePage("#jeuchoix", {transition: "slide"});
		
	}
	
	if(lastplayed == lastversus){
		lastwin = false;
		draw=true;
		turn=1;
	}else if(isWinner(lastplayed, lastversus)){
		wins++;
		turn=1;
		lastwin = true;
		draw=false;
	}else{
		looses++;
		turn=1;
		lastwin = false;
		draw=false;
	}
	
	$.mobile.changePage("#jeuresultat", {transition: "pop"});
}

function isWinner(player1, versus){
	switch(player1){
		case "1":
			if(versus == "2" || versus == "5")
				return true;
			return false;
			break;
		case "2":
			if(versus == "3" || versus == "4")
				return true;
			return false;
			break;
		case "3":
			if(versus == "1" || versus == "4")
				return true;
			return false;
			break;
		case "4":
			if(versus == "1" || versus == "5")
				return true;
			return false;
			break;
		case "5":
			if(versus == "2" || versus == "3")
				return true;
			return false;
			break;
	}
	return true;
}
