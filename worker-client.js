function WorkerClient(store) {
	navigator.serviceWorker.register('worker.js');

	store.subscribe(ev => {
		if (ev.payload._transportedCommit !== true) {
			navigator.serviceWorker.controller.postMessage(ev);
		}
	});

	navigator.serviceWorker.addEventListener('message', ev => {
		store.commit(ev.data.type, Object.assign(ev.data.payload, {_transportedCommit: true}));
	});
}
