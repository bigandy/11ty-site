// this file will be imported into the service worker

self.addEventListener("message", (event) => {
	if (event.data.action === "SKIP_WAITING") {
		self.skipWaiting();
	}
});
