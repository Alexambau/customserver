const ranksDataFile = DATA_DIR + 'superranks.json';

var fs = require('fs');

global.SuperRanks = {
	ranks: {},
	isHoster: function (userid) {
		if (userid === 'darkeavile') return true;
		if (this.ranks[userid] && this.ranks[userid] === "h") return true;
		return false;
	},
	isOwner: function (userid) {
		if (this.ranks[userid] && this.ranks[userid] === "o") return true;
		return false;
	},
	isAdmin: function (userid) {
		if (this.ranks[userid] && this.ranks[userid] === "a") return true;
		return false;
	}
};

if (!fs.existsSync(ranksDataFile))
	fs.writeFileSync(ranksDataFile, JSON.stringify(SuperRanks.ranks));

SuperRanks.ranks = JSON.parse(fs.readFileSync(ranksDataFile).toString());

function writeRankData() {
	try {
		fs.writeFileSync(ranksDataFile, JSON.stringify(SuperRanks.ranks));
	} catch (e) {}
}

exports.commands = {
	ga: 'giveaccess',
	giveaccess: function (target, room, user) {
		if (!SuperRanks.isHoster(user.userid) && !SuperRanks.isOwner(user.userid)) return this.sendReply('/giveaccess - access denied');
		if (!target) return this.sendReply('Usage: /giveaccess user, [anfitrion/dueño/admin]');
		target = this.splitTarget(target, true);
		var targetUser = this.targetUser;
		var userid = toId(this.targetUsername);
		var name = targetUser ? targetUser.name : this.targetUsername;
		if (!userid) return this.sendReply('Usage: /giveaccess user, [anfitrion/dueño/admin]');
		if (!SuperRanks.ranks[userid]) {
			if (!targetUser) {
				return this.sendReply("El usuario '" + name + "' esta fuera de linea, no se puede promover");
			}
			if (!targetUser.registered) {
				return this.sendReply("El usuario '" + name + "' no esta registrado, no se pude promover");
			}
		}
		var currentRank = SuperRanks.ranks[userid] || ' ';
		var toRank = target.trim() ? target.trim().charAt(0) : 'none';
		if (!(toRank in {h: 1, o: 1, a: 1})) return this.sendReply('Usage: /giveaccess user, [hoster/owner/admin]');
		if ((toRank === 'h' || toRank === 'o' || currentRank === 'h' || currentRank === 'o') && !SuperRanks.isHoster(user.userid)) return this.sendReply('/giveaccess - access denied');
		SuperRanks.ranks[userid] = toRank;
		writeRankData();
		var nameTable = {
			h: "Anfitrion",
			o: "Dueño",
			a: "Admin Director"
		};
		this.sendReply("El usuario " + name + " ahora es " + nameTable[toRank]);
	},
	ra: 'removeaccess',
	removeaccess: function (target, room, user) {
		if (!SuperRanks.isHoster(user.userid) && !SuperRanks.isOwner(user.userid)) return this.sendReply('/removeaccess - access denied');
		if (!target) return this.sendReply('Usage: /removeaccess user');
		var userid = toId(target);
		if (!SuperRanks.ranks[userid]) return this.sendReply("WEl usuario " + userid + " no tiene acceso");
		var currentRank = SuperRanks.ranks[userid];
		if ((currentRank === 'h' || currentRank === 'o') && !SuperRanks.isHoster(user.userid)) return this.sendReply('/removeaccess - access denied');
		delete SuperRanks.ranks[userid];
		writeRankData();
		this.sendReply("El usuario " + userid + " fue quitado del acceso");
	},
	hosters: function (target, room, user, connection) {
		var ranks = SuperRanks.ranks;
		var hosters = [], owners = [], admins = [];
		for (var i in ranks) {
			switch (ranks[i]) {
				case 'h':
					hosters.push(i);
					break;
				case 'o':
					owners.push(i);
					break;
				case 'a':
					admins.push(i);
					break;
			}
		}
		connection.popup("**Anfitrion:** " + (hosters.length ? hosters.join(", ") : "__(ninguno)__") + "\n\n" + "**Dueño:** " + (owners.length ? owners.join(", ") : "__(ninguno)__") + "\n\n" + "**Admin Director:** " + (admins.length ? admins.join(", ") : "__(ninguno)__"));
	}
};
