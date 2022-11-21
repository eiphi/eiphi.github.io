/* eslint-disable */
'use strict';

self.addEventListener('push', function (event) {
	console.log('[Service Worker] Push Received.');
	console.log('[Service Worker] Push had this data:', event.data.text());

	var title = event.data.text();
	var options = event.data;

	event.waitUntil(self.registration.showNotification(title, options));
});
