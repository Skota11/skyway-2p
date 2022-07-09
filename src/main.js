import App from './App.svelte';

let id = Math.random().toString(32).substring(2)

const app = new App({
	target: document.body,
	props:{
		"id" : id
	},
});

export default app;
