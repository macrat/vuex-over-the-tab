self.addEventListener('install', ev => self.skipWaiting());
self.addEventListener('activate', ev => self.clients.claim());


self.addEventListener('message', ev => {
	self.clients.matchAll().then(clients => clients.forEach(client => {
		if (client.id !== ev.source.id) {
			client.postMessage(ev.data);
		}
	}));
});
