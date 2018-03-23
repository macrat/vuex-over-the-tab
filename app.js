Vue.use(Vuex);


const store = new Vuex.Store({
	plugins: [
		WorkerClient,  // with ServiceWorker and Web Messaging API. It flexible way because does not depend on mutations kinds and signatures.
		//LocalStorageClient,  // with localStorage. It's can store color permanently even if close window or tab. And, a new tab will initialize with last choose color.
	],
	state: {
		red: Math.floor(Math.random()*256),
		green: Math.floor(Math.random()*256),
		blue: Math.floor(Math.random()*256),
		log: [],
	},
	mutations: {
		'set-color': function(state, value) {
			state.red = value.red;
			state.green = value.green;
			state.blue = value.blue;
		},
		'update:red': function(state, value) {
			state.red = value;
			state.log.push({idx: state.log.length, date: new Date(), target: 'red', red: state.red, green: state.green, blue: state.blue});
		},
		'update:green': function(state, value) {
			state.green = value;
			state.log.push({idx: state.log.length, date: new Date(), target: 'green', red: state.red, green: state.green, blue: state.blue});
		},
		'update:blue': function(state, value) {
			state.blue = value;
			state.log.push({idx: state.log.length, date: new Date(), target: 'blue', red: state.red, green: state.green, blue: state.blue});
		},
	},
});


const vm = new Vue({
	el: 'main',
	store: store,
	computed: {
		red: {
			get() { return this.$store.state.red; },
			set(x) { this.$store.commit('update:red', x); },
		},
		green: {
			get() { return this.$store.state.green; },
			set(x) { this.$store.commit('update:green', x); },
		},
		blue: {
			get() { return this.$store.state.blue; },
			set(x) { this.$store.commit('update:blue', x); },
		},
	},
});


if (window.name !== 'vuex-over-the-tab--subwindow') {
	window.open(location.href, 'vuex-over-the-tab--subwindow');
}
