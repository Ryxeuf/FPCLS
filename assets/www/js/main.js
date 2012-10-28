document.addEventListener("deviceready", init, true);

function init(){
	// Lien depuis la page d'accueil vers l'ecran de saisie
	$("#index div[data-role='content']").tap(function(){
		$.mobile.changePage("#page1");
	});
	
	// Initialisation de la base de donnees
	initDB();
	
	// Actions du jeu
	$("#oneplayer").click(function(event){
		newGame(1);
	});
	$("#twoplayer").click(function(event){
		newGame(2);
	});
	$(".choix").click(function(){
		playTurn($(this).attr("choix"));
	});
	$("#jeuchoix").bind('pageshow', function(){
		$("#joueurname").html(player1);
		if(nbplayers == 2){
			alert(player1);
		}
	});
	$("#jeuresultat").bind('pageshow', function(){
		$("#nb-wins").html(player1+": "+wins);
		$("#nb-looses").html(player2+": "+looses);
		if(draw){
			$("#result-played").html("C'est une egalite.");
			classeplayer="";
			classeversus="";
		}else if(lastwin){
			if(nbplayers == 1){
				$("#result-played").html("Bravo, vous avez gagne !");
				classeplayer="";
				classeversus="loose";
			}else{
				$("#result-played").html(player1+" gagne !");
				classeplayer="";
				classeversus="loose";
			}
		}else{
			if(nbplayers == 1){
				$("#result-played").html("Dommage, vous avez perdu...");
				classeplayer="loose";
				classeversus="";
			}else{
				$("#result-played").html(player2+" gagne !");
				classeplayer="loose";
				classeversus="";
			}
		}
		
		$("#player-played").html(
			$("<img>").attr("src", "css/images/"+choices[lastplayed]+".png").attr("class", classeplayer)
		);
		$("#versus-played").html(
			$("<img>").attr("src", "css/images/"+choices[lastversus]+".png").attr("class", classeversus)
		);

	});
	
	// Reutilisation des bouttons du telophone
	document.addEventListener("backbutton", backKeyDown, false);
	
	
	
	$("#apropos div[data-role='content']").touchmove(function(event) {
		if(event.originalEvent.touches.length == 2){
			$.mobile.changePage("#easteregg");
		}
	});
	
	
	$('[data-role=page]').live('pageshow', function (event, ui) {
	    try {
	        _gaq.push(['_setAccount', 'UA-35922789-1']);

	        hash = location.hash;

	        if (hash) {
	            _gaq.push(['_trackPageview', hash.substr(1)]);
	        } else {
	            _gaq.push(['_trackPageview']);
	        }
	    } catch(err) {

	    }

	});
	
	// Juste pour le developpement
	//development();
}

function backKeyDown(){
	if(confirm("Voulez-vous vraiment quitter l'application ?")){
		navigator.app.exitApp()
	}
}

function development(){
	$("#dev div[data-role='content']").tap(function(){
		$("#test").html(getIAChose());
	});
	
	$("#index div[data-role='content']").bind('touchmove', function(event) {
		if(event.originalEvent.touches.length == 3){
			alert("Vous avez gagne !");
		}
	});
}

