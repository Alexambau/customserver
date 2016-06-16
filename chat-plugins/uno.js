'use strict';
const deck = ["R1",
	"R2",
	"R3",
	"R4",
	"R5",
	"R6",
	"R7",
	"R8",
	"R9",
	"RS",
	"RR",
	"R+2",
	"Z+4",
	"Y1",
	"Y2",
	"Y3",
	"Y4",
	"Y5",
	"Y6",
	"Y7",
	"Y8",
	"Y9",
	"YS",
	"YR",
	"Y+2",
	"Z+4",
	"G1",
	"G2",
	"G3",
	"G4",
	"G5",
	"G6",
	"G7",
	"G8",
	"G9",
	"GS",
	"GR",
	"G+2",
	"Z+4",
	"B1",
	"B2",
	"B3",
	"B4",
	"B5",
	"B6",
	"B7",
	"B8",
	"B9",
	"BS",
	"BR",
	"B+2",
	"Z+4",
	"R1",
	"R2",
	"R3",
	"R4",
	"R5",
	"R6",
	"R7",
	"R8",
	"R9",
	"RS",
	"RR",
	"R+2",
	"ZW",
	"R0",
	"Y1",
	"Y2",
	"Y3",
	"Y4",
	"Y5",
	"Y6",
	"Y7",
	"Y8",
	"Y9",
	"YS",
	"YR",
	"Y+2",
	"ZW",
	"Y0",
	"G1",
	"G2",
	"G3",
	"G4",
	"G5",
	"G6",
	"G7",
	"G8",
	"G9",
	"GS",
	"GR",
	"G+2",
	"ZW",
	"G0",
	"B1",
	"B2",
	"B3",
	"B4",
	"B5",
	"B6",
	"B7",
	"B8",
	"B9",
	"BS",
	"BR",
	"B+2",
	"ZW",
	"B0",
];
//declare html for DRAW and PASS button.
const drawButton = '<center><button style="background: black; border: 2px solid rgba(33 , 68 , 72 , 0.59) ; width: 56px ; border-radius: 5px , auto" name="send" value="/uno draw"><font color="white">Tomar</font></button></center>';
const passButton = '<center><button style="background: red; border: 2px solid rgba(33 , 68 , 72 , 0.59) ; width: 56px ; border-radius: 5px , auto" name="send" value="/uno pass"><font color="white">Pasar</font></button></center>';

//get colour for html'd text and backgrounds
function getColour(colour, background) {
	if (!background && colour === "Y") return "orange";
	let colourTable = {
		"R": "red",
		"Y": "yellow",
		"B": "blue",
		"G": "green",
		"Z": "black",
	};
	return colourTable[colour];
}

//build html button for the card
function buildCard(id, notClickable) {
	let colour = getColour(id.charAt(0), true);
	let value = id.slice(1);
	let fontColour = colour === "yellow" ? "black" : "white";
	let command = "/uno play " + id;
	let clickable = notClickable ? ">" : "name=\"send\" value=\"" + command + "\">";
	let title = "title=\"" + getCardName(id) + "\"";
	let buttonFace = value === "W" ? '<img src="https://www.script-tutorials.com/demos/317/thumb.png" height="27" width="27">' : '<font color="' + fontColour + "\" size=6>" + value + "</font>";
	let button = "<button " + title + " style=\"background: " + colour + "; border: 2px solid rgba(33 , 68 , 72 , 0.59) ; height: 80px ; width: 56px ; border-radius: 5px , auto\"" + clickable + buttonFace + "</button>";
	return button;
}

//build an display of multiple cards
function buildHand(array, notClickable) {
	let hand = [];
	array.sort().forEach(function (c) {
		hand.push(buildCard(c, notClickable));
	});
	return hand.join("&nbsp;");
}


function initDeck(playerCount) {
	playerCount = Math.ceil(playerCount / 7);
	let tDeck = [];
	for (let i = 0; i < playerCount; i++) {
		tDeck = tDeck.concat(deck);
	}
	return tDeck;
}

function shuffleDeck(dArray) {
	let tDeck = [];
	let reiterations = dArray.length;
	for (let i = 0; i < reiterations; i++) {
		let rand = ~~(dArray.length * Math.random());
		tDeck.push(dArray[rand]);
		dArray.splice(rand, 1);
	}
	return tDeck;
}

function getCardName(id, colour) {
	let type = {
		"R": "Red",
		"Y": "Yellow",
		"B": "Blue",
		"G": "Green",
		"Z": "Wild",
	};
	let value = {
		"1": " 1",
		"2": " 2",
		"3": " 3",
		"4": " 4",
		"5": " 5",
		"6": " 6",
		"7": " 7",
		"8": " 8",
		"9": " 9",
		"0": " 0",
		"R": " Reverse",
		"S": " Skip",
		"+2": " Draw Two",
		"+4": " Draw Four",
		"W": "card",
	};
	if (colour) return "<font color=\"" + type[id.charAt(0)].toLowerCase().replace("yellow", "orange") + "\">" + type[id.charAt(0)] + value[id.slice(1)] + "</font>";
	return type[id.charAt(0)] + value[id.slice(1)];
}


function buildGameScreen(uhtmlid, top, roomid, hand, message, change, pass) {
	let html = (message ? "|uhtmlchange|" + uhtmlid : "|uhtml|" + uhtmlid) + "|";
	//make top card not clickable
	let topCard = "<center>" + buildCard(top, true) + "</center>";
	if (change) {
		topCard += "<br><center>El color a cambiado a:<br><font color=\"" + getColour(change) + "\">" + getColour(change, true) + "</font></center>";
	}
	let yourHand = buildHand(hand);
	message = message ? "<font color=\"red\"><b>" + message + "</b></font>" : "";
	return html + "<table border=1 style=\"border-collapse: collapse;\"><tr><td>&nbsp;<b>Ultima carta</b>&nbsp;</td><td>&nbsp;<b>Tu mano</b>&nbsp;</td></tr>" + "<tr><td>" + topCard + "</td><td>" + yourHand + "</td></tr><tr><td>" + (pass ? passButton : drawButton) + "</td><td>" + message + "</td></tr></table>";
}

//for wildcards that summon a colour change
function getColourChange(buffer, hand, uhtmlid) {
	return "|uhtmlchange|" + uhtmlid + "|<table border=1 style=\"border-collapse: collapse;\"><tr><td>Elije el color para cambiar:<br>" + '<button style="background: red; border: 2px solid rgba(33 , 68 , 72 , 0.59) ; width: 80px ; border-radius: 5px , auto" name="send" value="' + buffer + ' R"><font color="white" size=4>Rojo</font></button></center>' + '<button style="background: yellow; border: 2px solid rgba(33 , 68 , 72 , 0.59) ; width: 100px ; border-radius: 5px , auto" name="send" value="' + buffer + ' Y"><font color="black" size=4>Amarillo</font></button></center>' + '<button style="background: blue; border: 2px solid rgba(33 , 68 , 72 , 0.59) ; width: 80px ; border-radius: 5px , auto" name="send" value="' + buffer + ' B"><font color="white" size=4>Azul</font></button></center>' + '<button style="background: green; border: 2px solid rgba(33 , 68 , 72 , 0.59) ; width: 80px ; border-radius: 5px , auto" name="send" value="' + buffer + ' G"><font color="white" size=4>Verde</font></button></td></tr>' + '<tr><td>Tus cartas: <br>' + buildHand(hand, true) + '</td></tr></table>';
}

function getUserName(id) {
	return Users(id) ? Users(id).name : id;
}

class Game {
	constructor(room, playerCap) {
		if (!room.unoGameId) {
			room.unoGameId = 0;
		}
		room.unoGameId++;
		this.room = room;
		this.id = 0;
		this.top = null;
		this.discard = [];
		this.deck = null;
		//for player order
		this.list = [];
		this.data = {};
		this.joinedIps = {};
		this.player = null;
		this.gameid = "uno";
		this.started = false;
		this.timer = null;
		this.lastDraw = null;
		this.colourChange = null;
		this.uhtmlChange = null;
		this.playerCap = playerCap ? playerCap : null;
	}

	init() {
		this.room.add("|uhtml|new" + this.room.unoGameId + "|<div class=background: #050505\"><center><img src=\"http://droidpirate.com/wp-content/uploads/2011/01/UnoCC.png\" height=150 width=160><br><font color=black><b>Una nueva partida de UNO esta por comenzar</b></font><br> <button style=\"color: #fff;  background: linear-gradient(#000,#000, #000) ; \" height: 50px ; width: 70px ;\" name=\"send\" value=\"/uno join\">Entrar</button></center></div>");
	}

	join(user) {
		if (this.started) return false;
		let ip = user.latestIp;
		let userid = user.userid;

		if (this.playerCap && this.list.length >= this.playerCap) {
			return user.sendTo(this.room, "El juego ya está lleno.");
		}

		if (userid in this.data || ip in this.joinedIps) {
			return user.sendTo(this.room, "Usted ya tiene una alt unido a el juego.");
		}

		this.list.push(userid);
		//init empty hand
		this.data[userid] = [];
		this.joinedIps[ip] = 1;
		//make join messages clear away after game starts
		this.room.add("|uhtml|init" + this.room.unoGameId + "|" + user.name + " se ha unido al juego.");
	}

	start(user) {
		if (this.started) return false;
		if (this.list.length < 2) return user.sendTo(this.room, "No hay suficientes jugadores!");
		this.started = true;
		this.room.add("El jueo a empezado!");
		//hide the start message
		this.room.add("|uhtmlchange|new" + this.room.unoGameId + "|<div class=\"infobox\">El juego a empezado!</div>");
		//get first player
		this.player = this.list[~~(Math.random() * this.list.length)];
		this.room.add("El primer jugador es: " + getUserName(this.player) + ".");

		//create the deck
		this.deck = shuffleDeck(initDeck(this.list.length));

		//deal the cards
		this.list.forEach(function (u) {
			this.giveCard(u, 7);
		}.bind(this));

		//get the top card and put it into discard pile
		while (!this.top || this.top.charAt(0) === "Z") {
			this.top = this.deck.shift();
			this.discard.push(this.top);
		}
		//declare the top card
		this.room.add("|uhtml|" + this.room.unoGameId + "card" + this.id + "|" + "La primera carta es " + buildCard(this.top, true));
		this.uhtmlChange = "|uhtmlchange|" + this.room.unoGameId + "card" + this.id + "|La primera carta es <b>" + getCardName(this.top, true) + "</b>.";

		this.applyEffects();

		this.initNextTurn();
	}

	giveCard(userid, number, display) {
		if (!number) number = 1;
		let newCards = [];
		for (let i = 0; i < number; i++) {
			let newCard = this.deck.shift();
			this.data[userid].push(newCard);
			newCards.push(newCard);
			//shuffle deck if deck is empty
			if (this.deck.length === 0) {
				if (this.discard.length === 0) {
					//if no cards in discard pile, add a new deck.
					this.discard = initDeck(1);
				}
				//shuffle discard pile to create new deck for drawing
				this.deck = shuffleDeck(this.discard);
			}
		}
		if (display && Users(userid)) {
			return Users(userid).sendTo(this.room, "|raw|Haz tomado la siguiente tarjeta(s): " + buildHand(newCards, true));
		}
		//only for draw 1
		if (newCards.length === 1) return newCards[0];
	}

	getNextPlayer(number) {
		//make list run over if it's at the last player
		let playerList = this.list.concat(this.list);
		//get index of current player
		let index = playerList.indexOf(this.player);
		//apply next player
		this.player = playerList[index + (number || 1)];
	}

	applyEffects() {
		let effect = this.top.slice(1);
		switch (effect) {
		case "R":
			//reverse; turn the array of players upside down.
			this.list = this.list.reverse();
			this.room.add("La direccion del juego se a invertido!");
			if (this.id === 0) {
				this.getNextPlayer();
				break;
			} else if (this.list.length === 2) {
				//skip back to the player that played the card
				this.getNextPlayer();
			} else {
				//skip back two slots to the player before the user who played the card
				this.getNextPlayer(2);
			}
			break;
		case "S":
			this.room.add(getUserName(this.player) + " tu turno se ha salteado!");
			//skip the player and move on to the next;
			this.getNextPlayer();
			break;
		case "+2":
			this.room.add(getUserName(this.player) + " tu turno se ha salteado y eres forzado a tomar dos cartas!");
			//give 2 cards
			this.giveCard(this.player, 2, true);
			//skip the player
			this.getNextPlayer();
			break;
		case "+4":
			this.room.add(getUserName(this.player) + " tu turno se ha saltado, y eres forzado a tomar 4 cartas!");
			//give 4 cards
			this.giveCard(this.player, 4, true);
			//skip the player
			this.getNextPlayer();
			break;
		}
	}

	validatePlay(user, card) {
		//returning false means there are no issues;
		//otherwise this will return a error message which will be displayed to the user when it builds the next control screen.
		let hand = this.data[user.userid];
		if (this.lastDraw && card !== this.lastDraw) {
			return "You must play the last card you drew! (" + getCardName(this.lastDraw) + ")";
		}
		if (hand.indexOf(card) === -1) return "Usted no tiene esa tarjeta!";
		let currentColour = this.colourChange || this.top.charAt(0);
		let currentValue = this.top.slice(1);
		//verify that the player has no cards of the same colour in their hand
		if (card === "Z+4") {
			for (let i = 0; i < hand.length; i++) {
				if (hand[i].charAt(0) === currentColour) return "No se puede jugar a este cuando usted todavía tiene una tarjeta con el mismo color que la primera carta.";
			}
			return false;
		}
		//wild cards can be played anytime
		if (card === "ZW") return false;
		//check if the card is either the same value or the same colour
		if (card.charAt(0) === currentColour || card.slice(1) === currentValue) return false;
		return "La tarjeta tiene que coincidir con el valor ya sea color o el numero de la primera carta.";
	}

play(user, card, change) {
		//check if it's that players turn
		if (this.player !== user.userid) return;
		//check validity of play and send error message
		let issues = this.validatePlay(user, card);
		if (issues) {
			return this.sendGameScreen(user, issues);
		}
		this.colourChange = null;
		this.clearTimer();
		//shrink last turn's card
		this.room.add(this.uhtmlChange);
		this.clearGameScreen(user);

		//clear last draw
		this.lastDraw = null;

		//announce the card and the change
		this.room.add("|uhtml|" + this.room.unoGameId + "card" + this.id + "|" + user.name + " Juega " + buildCard(card, true));
		this.uhtmlChange = "|uhtmlchange|" + this.room.unoGameId + "Carta" + this.id + "|" + user.name + " Juega <b>" + getCardName(card, true) + "</b>.";

		//move card onto top and discard pile
		this.top = card;
		this.discard.push(card);

		//remove the card from the players hand
		this.data[user.userid].splice(this.data[user.userid].indexOf(card), 1);

		//count cards
		if (change) {
			this.colourChange = change;
			let fontColour = getColour(change);
			this.room.add("|raw|<font color=\"" + fontColour + "\">El color ha cambiado a: <b>" + getColour(change, true).toUpperCase() + "</b>.</font>");
		}
		//move to next player
		this.getNextPlayer();
		this.room.update();

		//apply the effects of the current card to the next player in queue.
		this.applyEffects();
		if (this.data[user.userid].length === 1) {
			//do a uno thing
			this.uno = user.userid;
			let userButton = "<center><button style=\"background: #00ff00; border: 2px solid rgba(33 , 68 , 72 , 0.59) ; width: 200px ; border-radius: 5px , auto\" name=\"send\" value=\"/uno uno\"><font color=\"black\" size=10>UNO</font></button></center>";
			user.sendTo(this.room.id, "|uhtml|" + this.room.unoGameId + "uno" + this.id + "|" + userButton);
			//send individual button to all the other players
			let opponentButton = "<center><button style=\"height: 75px ; width: 200px ;\" name=\"send\" value=\"/uno uno\">Make " + user.name + " draw 2 cards! </button></center>";
			for (let u in this.data) {
				if (!Users(u) || u === user.userid) continue;
				Users(u).sendTo(this.room.id, "|uhtml|" + this.room.unoGameId + "uno" + this.id + "|" + opponentButton);
			}
			return;
		} else if (this.data[user.userid].length === 0) {
			return this.end(user.name);
		}
		//start next turn
		this.initNextTurn();
	}

	draw(user) {
		if (this.player !== user.userid || this.lastDraw) return;
		this.lastDraw = this.giveCard(user.userid, 1);
		//clean up last display
		this.clearGameScreen(user);
		this.sendGameScreen(user, "Que ha tomado una " + getCardName(this.lastDraw) + ".");
		this.room.add(user.name + " ha tomado una carta.");
		this.room.update();
	}

	pass(user) {
		if (this.player !== user.userid || !this.lastDraw) return;
		this.room.add(user.name + " ha pasado.");
		this.room.add(this.uhtmlChange);
		this.clearGameScreen(user);
		this.clearTimer();
		this.getNextPlayer();
		this.id++;
		this.lastDraw = null;
		this.initNextTurn();
	}

	sendGameScreen(user, message) {
		let display = buildGameScreen(this.room.unoGameId + "display" + this.id, this.top, this.room.id, this.data[user.userid], message ? message : "", this.colourChange, this.lastDraw ? 1 : 0);
		user.sendTo(this.room, display);
	}

	clearGameScreen(user) {
		user.sendTo(this.room, "|uhtmlchange|" + this.room.unoGameId + "display" + this.id + "|");
	}

	clearTimer() {
		clearTimeout(this.timer);
	}

	runDQ() {
		//set a disqualification timer for 90 seconds
		this.timer = setTimeout(function () {
			this.disqualify(this.player);
		}.bind(this), 90000);
	}

	initNextTurn() {
		this.room.add(getUserName(this.player) + " es tu turno.");
		this.room.update();
		this.id++;
		let user = Users.get(this.player);
		if (!user) this.disqualify(this.player);
		this.sendGameScreen(user);
		this.runDQ();
	}

	disqualify(userid) {
		//if there are still players in the game.
		if (this.list.length > 2) {
			//if current player is the one being disqualify move on to next player.
			if (!this.removePlayer(userid)) return true;
			if (userid === this.player) {
				if (Users.get(userid)) {
					this.clearGameScreen(Users.get(userid));
					this.room.add(this.uhtmlChange);
				}
				this.clearTimer();
				this.room.add(getUserName(userid) + " ha sido descalificado");
				this.getNextPlayer();
				this.initNextTurn();
				return true;
			}
			this.room.add(getUserName(userid) + " ha sido descalificado");
			return true;
		} else {
			if (this.removePlayer(userid)) {
				this.room.add(getUserName(userid) + " ha sido descalificado");
				this.end(this.list[0]);
				return false;
			}
		}
	}

	removePlayer(userid) {
		if (this.list.indexOf(userid) === -1) return false;
		this.list.splice(this.list.indexOf(userid), 1);
		delete this.data[userid];
		return true;
	}

	parseUNO(user) {
		if (!this.uno) return false;
		if (user.userid === this.uno) {
			this.room.add("|raw|<b>UNO!</b>");
			this.room.add("|uhtmlchange|" + this.room.unoGameId + "uno" + this.id + "|" + getUserName(this.uno) + " is safe!");
			this.room.update();
			this.uno = false;
			this.initNextTurn();
		} else if (this.list.indexOf(user.userid) > -1) {
			this.room.add("|raw|" + getUserName(this.uno) + "  was caught for not saying UNO and is forced to draw 2 cards!");
			this.room.add("|uhtmlchange|" + this.room.unoGameId + "uno" + this.id + "|" + getUserName(this.uno) + " was caught!");
			this.giveCard(this.uno, 2, true);
			this.uno = false;
			this.initNextTurn();
		}
	}

	end(winner) {
		//hide the start message
		this.clearTimer();
		if (this.player && Users.get(this.player)) {
			this.clearGameScreen(Users.get(this.player));
		}
		if (this.uhtmlChange) this.room.add(this.uhtmlChange);
		this.room.add("|uhtmlchange|new" + this.room.unoGameId + "|<div class=\"infobox\">El juego a terminado</div>");
		if (!winner) {
			this.room.add("El juego de UNO ha sido terminado");
		} else {
			this.room.add("Felicidades a " + getUserName(winner) + " por ganar el juego UNO!");
		}
		this.room.update();
		delete this.room.game;
	}
}

exports.commands = {
	uno: {
		new: function (target, room, user) {
			if (!this.can("announce", null, room)) return false;
			if (room.unoDisabled) return this.errorReply("UNO is currently disabled in this room.");
			let cap = target ? parseInt(target, 10) : null;
			if (room.game) return this.errorReply("Ya existe un juego en curso en esta sala.");
			if (cap && cap < 2) return this.errorReply("El juego tiene que ser de al menos 2 personas.");

			room.game = new Game(room, cap);
			//start message;
			room.game.init();
		},
		join: function (target, room, user) {
			if (room.game && room.game.gameid === "uno") room.game.join(user);
		},
		start: function (target, room, user) {
			if (!this.can("announce", null, room)) return false;
			if (room.game && room.game.gameid === "uno") room.game.start(user);
		},
		end: function (target, room, user) {
			if (!this.can("announce", null, room)) return false;
			if (room.game && room.game.gameid === "uno") room.game.end();
		},
		leave: function (target, room, user) {
			if (room.game && room.game.gameid === "uno" && !room.game.started) {
				let success = room.game.removePlayer(user.userid);
				if (!success) return user.sendTo(this.room, "Usted no se ha inscrito para el juego.");
				let ip = user.latestIp;
				delete room.game.joinedIps[ip];
				room.add("|uhtml|init" + room.unoGameId + "|" + user.name + " ha abandonado el juego.");
			}
		},
		play: function (target, room, user) {
			if (!room.game || room.game.gameid !== "uno") return false;
			if (!target) return this.parse("/help uno play");
			let params = target.split(" ");
			let card = params.shift();
			let change = null;
			if (card.charAt(0) === "Z" && ["R", "Y", "B", "G"].indexOf(params[0]) > -1) {
				change = params[0];
			} else if (card.charAt(0) === "Z") {
				let uhtmlid = room.unoGameId + "display" + room.game.id;
				return user.sendTo(room, getColourChange("/uno play " + card, room.game.data[user.userid], uhtmlid));
			}
			room.game.play(user, card, change);
		},
		draw: function (target, room, user) {
			if (room.game && room.game.gameid === "uno") room.game.draw(user);
		},
		pass: function (target, room, user) {
			if (room.game && room.game.gameid === "uno") room.game.pass(user);
		},
		dq: function (target, room, user) {
			if (!this.can("announce", null, room)) return false;
			if (!target) return this.parse("/help uno dq");
			if (room.game && room.game.gameid === "uno") room.game.disqualify(toId(target));
		},
		dqhelp: ["/uno dq [user] - disqualifies a user from the game."],
		display: function (target, room, user) {
			if (!room.game || room.game.gameid !== "uno" || user.userid !== room.game.player) return false;
			room.game.clearGameScreen(user);
			room.game.id++;
			room.game.sendGameScreen(user);
		},
		uno: function (target, room, user) {
			if (room.game && room.game.gameid === "uno" && room.game.started) {
				room.game.parseUNO(user);
			}
		},
		enable: function (target, room, user) {
			if (!this.can('tournamentsmanagement', null, room)) return;
			if (!room.unoDisabled) return this.errorReply("UNO no esta deshabilitado para la sala");
			delete room.unoDisabled;
			if (room.chatRoomData) {
				delete room.chatRoomData.unoDisabled;
				Rooms.global.writeChatRoomData();
			}
			return this.sendReply("UNO ha sido habilitado para la sala");
		},
		disable: function (target, room, user) {
			if (!this.can('tournamentsmanagement', null, room)) return;
			if (room.unoDisabled) return this.errorReply("UNO ya estaba disabilitado para la sala");
			room.unoDisabled = true;
			if (room.chatRoomData) {
				room.chatRoomData.unoDisabled = true;
				Rooms.global.writeChatRoomData();
			}
			return this.sendReply("UNO ha sido desabilitado para la sala");
		},
		"": function (target, room, user) {
			if (!room.game || room.game.gameid !== "uno" || user.userid !== room.game.player) return this.parse("/help uno");
			this.parse("/uno display");
		},
	},
	unohelp: [
		"/uno new (player cap) - Crea una partida de UNO.",
		"/uno join - Entra al la partida de UNO.",
		"/uno leave - Sales de la partida de UNO.",
		"/uno start - Inicia el juego UNO",
		"/uno play [id de la carta] [cambia] - Juega la carta de uno y especifica el cambio de color si procede.",
		"/uno draw - Toma una carta.",
		"/uno pass - Pasar después de tomar una tarjeta.",
		"/uno uno - Grita \"UNO!\" o intentar atrapar a alguien por no decir uno.",
		"/uno enable - Habilita UNO para la sala",
		"/uno disable - Desabilita UNO para la sala.",
	],
};