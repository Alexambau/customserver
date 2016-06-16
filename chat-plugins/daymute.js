var fs = require('fs');
exports.commands = {
 
 dm: 'daymute',
	daymute: function (target, room, user) {
		if (!target) return this.parse('/help daymute');
		if (!this.can('mute', targetUser, room)) return false;
                if (room.isMuted(user) && !user.can('bypassall')) return this.errorReply("Usted no puede hablar en esta sala");
		
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser) return this.sendReply('El usuario "' + this.targetUsername + '" no se encuentra.');

		if ((room.isMuted(targetUser) && !canBeMutedFurther) || targetUser.locked || !targetUser.connected) {
			var problem = " pero ya estaba " + (!targetUser.connected ? "offline" : targetUser.locked ? "locked" : "licked");
			if (!target) {
				return this.privateModCommand("(" + targetUser.name + "sería silenciado por " + user.name + problem + ".)");
			}
			return this.addModCommand("" + targetUser.name + " sería silenciado por " + user.name + problem + "." + (target ? " (" + target + ")" : ""));
		}

		targetUser.popup(user.name + ' ha sido muteado durante 24 horas ' + target);
		this.addModCommand('' + targetUser.name + ' a sido muteado por ' + user.name + 'durante 24 horas.' + (target ? " (" + target + ")" : ""));
		var alts = targetUser.getAlts();
		if (alts.length) this.addModCommand("" + targetUser.name + "'s sus alts tambien fueron muteados " + alts.join(", "));

		room.mute(targetUser, 24 * 60 * 60 * 1000, true);
	},

};
