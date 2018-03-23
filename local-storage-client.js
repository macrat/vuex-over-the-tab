function LocalStorageClient(store) {
	store.subscribe(ev => {
		localStorage.setItem('local-storage-client::red', JSON.stringify(store.state.red));
		localStorage.setItem('local-storage-client::green', JSON.stringify(store.state.green));
		localStorage.setItem('local-storage-client::blue', JSON.stringify(store.state.blue));
	});

	window.addEventListener('storage', ev => {
		if (ev.key === 'local-storage-client::red' && ev.oldValue !== ev.newValue) {
			store.commit('update:red', JSON.parse(ev.newValue));
		}
		if (ev.key === 'local-storage-client::green' && ev.oldValue !== ev.newValue) {
			store.commit('update:green', JSON.parse(ev.newValue));
		}
		if (ev.key === 'local-storage-client::blue' && ev.oldValue !== ev.newValue) {
			store.commit('update:blue', JSON.parse(ev.newValue));
		}
	});

	const red = localStorage.getItem('local-storage-client::red');
	const green = localStorage.getItem('local-storage-client::green');
	const blue = localStorage.getItem('local-storage-client::blue');
	if (red && green && blue) {
		store.commit('set-color', {
			red: JSON.parse(red),
			green: JSON.parse(green),
			blue: JSON.parse(blue),
		});
	}
}
