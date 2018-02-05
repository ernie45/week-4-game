//Variable Definitions////////////////////////////////////////////////////////////////
/** Create the players available for the game */
var player1 = new Player("Luke Skywalker", 550, 15, 70, "assets/images/luke.png");
var player2 = new Player("Obi Wan", 500, 20, 85, "assets/images/obi.jpg");
var player3 = new Player("Darth Vader", 450, 25, 90, "assets/images/darthvader.jpg");
var player4 = new Player("Yoda", 400, 30, 95, "assets/images/yoda.jpg");

/** User's character choice */
var mainCharacter = null;
/** Opponent currently battling the user */
var currentOpponent = null;
/** This will hold all the previous enemies */
var oldOpponents = [];
/** Keep track of how many times the user has won */
var wins = 0;


//MAIN FUNCTION//////////////////////////////////////////////////////////////////////
$(document).ready(function(){
	/** Handle clicking on a character for battle */
	$(".character").on("click", function(){
		//CAPTURE ID NAME OF THE CHARACTER//
		/** The html holds an id attribute with each player's name */
		var characterName = $(this).attr("id");
		/** If there's an available spot to choose a mainCharacter */
		if (mainCharacter === null){
			/** Create the main player with the name of the character */
			actualPlayer(characterName);
			/** Instruct the player to choose an opponent */
			$("#characters").html("<h2>CHOOSE YOUR OPPONENT:</h2>");
		}
		/** If the main character slot is not open */
		/** Then the next choice of characters is the opponent choice by default */
		else {
			/** Now check if the opponent has been chosen */
			/** Also make sure that the character chosen is not the same as the main character */
			if (currentOpponent === null && mainCharacter.name !== characterName){
				/** Hide the instruction that instructs to choose another opponent */
				$("#awesomeButton").css("visibility", "hidden");
				//MAKE SURE THE CHARACTERCHOSEN HASN'T ALREADY BEEN FOUGHT//
				if (!inArray(oldOpponents, characterName)){
					/** If hasn't already been fought, create computer player with the name of the character chosen */
					computerPlayer(characterName);
					/** Show the user the enemies remaining for future battle */
					$("#characters").html("<h2>ENEMIES REMAINING:</h2>");
				}
			}
		}8
	});


	/** Handle attacking during a battle */
	$("#attackButton").on("click", function(){
		//AS LONG AS CURRENTOPPONENT HAS LIFE//
		if (currentOpponent.health >= 0){
			/** Increase the fighting power of the main character */
			mainCharacter.attack += mainCharacter.attack;
			/** Reduce the health of the opponent by the main character attack power */
			currentOpponent.health -= mainCharacter.attack;
			/** Decrease the main character's health by the power of the opponent */
			mainCharacter.health -= currentOpponent.counter;


			/** Refresh the health of both characters */
			$("#defenderHealth").html(mainCharacter.health);
			$("#fightHealth").html(currentOpponent.health);
		}
		/** If the opponent has died */
		else{
			/** Push the opponent to the old opponents array */
			oldOpponents.push(currentOpponent.name);
			/** Reset the currentOpponent slot */
			currentOpponent = null;
			/** Hide the battle button */
			$("#attackButton").css("visibility", "hidden");
			/** Hide the fight area */
			$("#fight").css("visibility", "hidden");
			/** Display instruction to choose another opponent */
			$("#awesomeButton").css("visibility", "visible");
			/** Increment the amount of wins for the user */
			wins++;
		}


		/** If user's health is non-existent */
		if (mainCharacter.health <= 0){
			/** Let the user know he/she has lost */
			$("body").html("<h1>YOU JUST LOST!</h1>");
		}
		/** If the Wins are 3, which is the amount of times a user can win */
		else if (wins === 3){
			/** Let user know he/she has won */
			$("body").html("<h1>YOU JUST WON!</h1>");
		}
	});
});




//FUNCTIONS TO CALL//////////////////////////////////////////////////////////////////

/** This is the constructor for creating any player */
function Player(name, health, attack, counter, image){
	this.name = name;
	this.health = health;
	this.attack = attack;
	this.counter = counter;
	this.image = image;
};
/** This will create the main player based on user's choice */
/** While deleting the user's choice from the characters to choose list */
function actualPlayer(characterName){
	$("#fightSection").css("visibility", "visible");
	$("#defender").css("visibility", "visible");
	if (characterName === "Luke Skywalker"){
		mainCharacter = player1;
		$("#defenderName").html("YOU:");
		$("#defenderImage").attr("src", player1.image);
		$("#defenderHealth").html(player1.health);
		$("#lukeDiv").remove();
	}
	else if (characterName === "Obi Wan"){
		mainCharacter = player2;
		$("#defenderName").html("YOU:");
		$("#defenderImage").attr("src", player2.image);
		$("#defenderHealth").html(player2.health);
		$("#obiDiv").remove();
	}
	else if (characterName === "Darth Vader"){
		mainCharacter = player3;
		$("#defenderName").html("YOU:");
		$("#defenderImage").attr("src", player3.image);
		$("#defenderHealth").html(player3.health);
		$("#darthDiv").remove();
	}
	else if (characterName === "Yoda"){
		mainCharacter = player4;
		$("#defenderName").html("YOU:");
		$("#defenderImage").attr("src", player4.image);
		$("#defenderHealth").html(player4.health);
		$("#yodaDiv").remove();
	}
};
/** This will create the oponent for the user based on his/her choosing */
function computerPlayer(characterName){
	$("#versus").css("visibility", "visible");
	$("#attackButton").css("visibility", "visible");
	$("#fight").css("visibility", "visible");
	if (characterName === "Luke Skywalker"){
		currentOpponent = player1;
		$("#fightName").html("OPPONENT:");
		$("#fightImage").attr("src", player1.image);
		$("#fightHealth").html(player1.health);
		$("#lukeDiv").remove();
	}
	else if (characterName === "Obi Wan"){
		currentOpponent = player2;
		$("#fightName").html("OPPONENT:");
		$("#fightImage").attr("src", player2.image);
		$("#fightHealth").html(player2.health);
		$("#obiDiv").remove();
	}
	else if (characterName === "Darth Vader"){
		currentOpponent = player3;
		$("#fightName").html("OPPONENT:");
		$("#fightImage").attr("src", player3.image);
		$("#fightHealth").html(player3.health);
		$("#darthDiv").remove();
	}
	else if (characterName === "Yoda"){
		currentOpponent = player4;
		$("#fightName").html("OPPONENT:");
		$("#fightImage").attr("src", player4.image);
		$("#fightHealth").html(player4.health);
		$("#yodaDiv").remove();
	}
};

function inArray(array, characterName){
	/** Traverse the entire array */
	for (var i = 0; i < array.length; i++){
		/** Return true if the array's component is equal to the characterName passed */
		return array[i] === characterName;
	}
};
