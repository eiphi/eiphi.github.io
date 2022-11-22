/* eslint-disable */
'use strict';

self.addEventListener('push', function (event) {
	console.log('[Service Worker] Push Received.');
	console.log('[Service Worker] Push had this data:', event.data.text());
	console.log('ortto-w.js file updated');

	var title = event.data.text();
	var options = event.data;

	event.waitUntil(self.registration.showNotification(title, options));
});
