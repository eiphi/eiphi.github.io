/* eslint-disable */
'use strict';

self.addEventListener('push', function (event) {
	console.log('[Service Worker] Push Received.');
	console.log('[Service Worker] Push had this data:', event.data.text());

	var title = event.data.json().title;
	var options = event.data.json();

	event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
	event.notification.close();
	// Checks primary action for url and opens the window in client
	var primaryActionData = event.notification.data && event.notification.data.primary_action;
	if (primaryActionData && primaryActionData.url && primaryActionData.action === 'page') {
		if (clients.openWindow) return clients.openWindow(primaryActionData.url);
	}
});
