self.addEventListener('message', ev => {
	self.clients.matchAll().then(clients => clients.forEach(client => {
		if (client.id !== ev.source.id) {
			client.postMessage(ev.data);
		}
	}));
});
