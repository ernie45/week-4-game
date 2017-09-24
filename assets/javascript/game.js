//Variable Definitions////////////////////////////////////////////////////////////////
var mainCharacter = null;
var currentOpponent = null;
var oldOpponents = [];
var player1 = new Player("Luke Skywalker", 550, 15, 70, "assets/images/luke.png");
var player2 = new Player("Obi Wan", 500, 20, 85, "assets/images/obi.jpg");
var player3 = new Player("Darth Vader", 450, 25, 90, "assets/images/darthvader.jpg");
var player4 = new Player("Yoda", 400, 30, 95, "assets/images/yoda.jpg")
var wins = 0;


//MAIN FUNCTION//////////////////////////////////////////////////////////////////////
$(document).ready(function(){
	//UPON CLICKING ON A CHARACTER//
	$(".character").on("click", function(){
		//CAPTURE ID NAME OF THE CHARACTER//
		var value = $(this).attr("id");
		//IF MAINCHARACTER IS EMPTY, MAINCHARACTER BECOMES CHARACTER CHOSEN//
		if (mainCharacter === null){
			actualPlayer(value);
			$("#characters").html("<h2>CHOOSE YOUR OPPONENT:</h2>");
		}
		//IF CURRENTOPPONENT IS EMPTY, AND MAINCHARACTER IS NOT THE CHARACTER CHOSEN,//
		//THEN CURRENTOPPONENT BECOMES CHARACTER CHOSEN//
		else {
			if (currentOpponent === null && mainCharacter.name !== value){
				$("#awesomeButton").css("visibility", "hidden");
				//MAKE SURE THE CHARACTERCHOSEN HASN'T ALREADY BEEN FOUGHT//
				if (!inArray(oldOpponents, value)){
					computerPlayer(value);
					$("#characters").html("<h2>ENEMIES REMAINING:</h2>");
				}
			}
		}8
	});
	//UPON CLICKING THE ATTACK BUTTON//
	$("#attackButton").on("click", function(){
		//AS LONG AS CURRENTOPPONENT HAS LIFE//
		//CURRENT OPPONENT LIFE DECREASES, AND MAINCHARACTER ATTACKPOWER//
		//INCREASES//
		if (currentOpponent.health >= 0){
			mainCharacter.attack += mainCharacter.attack;
			currentOpponent.health -= mainCharacter.attack;
			mainCharacter.health -= currentOpponent.counter;
			$("#defenderHealth").html(mainCharacter.health);
			$("#fightHealth").html(currentOpponent.health);
		}
		//IF CURRENTOPPONENT LOSES, PUSH IT TO THE OLDOPPONENTS ARRAY//
		else{
			oldOpponents.push(currentOpponent.name);
			currentOpponent = null;
			$("#attackButton").css("visibility", "hidden");
			$("#fight").css("visibility", "hidden");
			$("#awesomeButton").css("visibility", "visible");
			wins++;
		}
		if (mainCharacter.health <= 0){
			$("body").html("<h1>YOU JUST LOST!</h1>");
		}
		else if (wins === 3){
			$("body").html("<h1>YOU JUST WON!</h1>");
		}
	});
});




//FUNCTIONS TO CALL//////////////////////////////////////////////////////////////////
function Player(name, health, attack, counter, image){
	this.name = name;
	this.health = health;
	this.attack = attack;
	this.counter = counter;
	this.image = image;
};
function actualPlayer(value){
	$("#fightSection").css("visibility", "visible");
	$("#defender").css("visibility", "visible");
	if (value === "Luke Skywalker"){
		mainCharacter = player1;
		$("#defenderName").html("YOU:");
		$("#defenderImage").attr("src", player1.image);
		$("#defenderHealth").html(player1.health);
		$("#lukeDiv").remove();
	}
	else if (value === "Obi Wan"){
		mainCharacter = player2;
		$("#defenderName").html("YOU:");
		$("#defenderImage").attr("src", player2.image);
		$("#defenderHealth").html(player2.health);
		$("#obiDiv").remove();
	}
	else if (value === "Darth Vader"){
		mainCharacter = player3;
		$("#defenderName").html("YOU:");
		$("#defenderImage").attr("src", player3.image);
		$("#defenderHealth").html(player3.health);
		$("#darthDiv").remove();
	}
	else if (value === "Yoda"){
		mainCharacter = player4;
		$("#defenderName").html("YOU:");
		$("#defenderImage").attr("src", player4.image);
		$("#defenderHealth").html(player4.health);
		$("#yodaDiv").remove();
	}
};
function computerPlayer(value){
	$("#versus").css("visibility", "visible");
	$("#attackButton").css("visibility", "visible");
	$("#fight").css("visibility", "visible");
	if (value === "Luke Skywalker"){
		currentOpponent = player1;
		$("#fightName").html("OPPONENT:");
		$("#fightImage").attr("src", player1.image);
		$("#fightHealth").html(player1.health);
		$("#lukeDiv").remove();
	}
	else if (value === "Obi Wan"){
		currentOpponent = player2;
		$("#fightName").html("OPPONENT:");
		$("#fightImage").attr("src", player2.image);
		$("#fightHealth").html(player2.health);
		$("#obiDiv").remove();
	}
	else if (value === "Darth Vader"){
		currentOpponent = player3;
		$("#fightName").html("OPPONENT:");
		$("#fightImage").attr("src", player3.image);
		$("#fightHealth").html(player3.health);
		$("#darthDiv").remove();
	}
	else if (value === "Yoda"){
		currentOpponent = player4;
		$("#fightName").html("OPPONENT:");
		$("#fightImage").attr("src", player4.image);
		$("#fightHealth").html(player4.health);
		$("#yodaDiv").remove();
	}
};
function inArray(array, value){
	for (var i = 0; i < array.length; i++){
		return array[i] === value;
	}
};
