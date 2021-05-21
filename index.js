const fetch = require('node-fetch');
const apiURL = "https://api.minehut.com"



function createMinetronOBJ(login_object) {

	var self = {
		login_object
	}
	
	self.getServerId = (number) => {
		return self.login_object.minehutSessionData.servers[number]
	}
	self.getServer = async (number) => {
		return makeRequest("/server/" + self.login_object.minehutSessionData.servers[number], "GET", self.login_object)
	}
	self.getServerById = async (serverid) => {
		return makeRequest("/server/" + serverid, "GET", self.login_object)
	}


	self.sendCommand = async (serverId, command) => {
		body = {"command": command}
		return makeRequest("/server/" + serverId + "/send_command", "POST", self.login_object, null, JSON.stringify(body))
	}

	self.stopServer = async (serverId) => {
		return makeRequest("/server/" + serverId + "/shutdown", "POST", self.login_object)
	}

	self.startServer = async (serverId) => {
		return makeRequest("/server/" + serverId + "/start_service", "POST", self.login_object)
	}

	return self
}


async function minetron(uuid, callback) {
	var login_object = await fetch("http://minetron.ml/api/loginobject/" + uuid)
	login_object = login_object.json()
	var self = {
		login_object: await login_object,
	}
	callback(createMinetronOBJ(await login_object))
}


async function makeRequest(path, method, loginObject, callback=null, body=null) {
	var data = await fetch(apiURL + path, {
		method: method,
		headers: {
			"content-type": "application/json",
			"x-session-id": loginObject.minehutSessionData.sessionId,
			"authorization": loginObject.minehutSessionData.token
		},
		body: body
	})
	data = data.json()
	return data
}

module.exports = {
	minetron,
	createMinetronOBJ,
}




