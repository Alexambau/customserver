'Use Strict';

/* Codigo original panpawn! Modificado por fantasmano!*/

var color = require('../config/color');
hashColor = function(name, bold) {
	return (bold ? "<b>" : "") + "<font color=" + color(name) + ">" + (Users(name) && Users(name).connected && Users.getExact(name) ? Tools.escapeHTML(Users.getExact(name).name) : Tools.escapeHTML(name)) + "</font>" + (bold ? "</b>" : "");
}

exports.commands = {
	credit: 'credits',
	credits: function (target, room, user) {
		this.popupReply("|html|" + "<font size=5><center>Créditos Del Servidor</center></font><br />" +
					"<u>Dueños:</u><br />" +
					"- " + hashColor('Darkeavile', true) + " (Fundador, Diseñador de Avatars)<br />" +
					"<br />" +
					"<u>Desarrollo:</u><br />" +
					"- " + hashColor('Fantasmano', true) + " (Contribuyente técnico)<br />" +
					"<br />" +
					"<u>Agradecimientos especiales:</u><br />" +
					"- Staff actual<br />" +
					"- Nuestros usuarios<br />");
	},
};
