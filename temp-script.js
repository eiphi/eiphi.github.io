/* eslint-disable */
'use strict';

self.addEventListener('push', function (event) {
	console.log('[Service Worker] Push Received.');
	console.log('[Service Worker] Push had this data:', event.data.text());

	var title = event.data.json().title;
	var options = event.data.json();

	event.waitUntil(self.registration.showNotification(title, options));
});

function openUrl(_event) {
	_event.waitUntil(
		clients
			.matchAll({
				type: 'window'
			})
			.then(function (clientList) {
				for (var i = 0; i < clientList.length; i++) {
					var client = clientList[i];
					if (client.url === '/' && 'focus' in client) return client.focus();
				}
				if (clients.openWindow) return clients.openWindow('/');
			})
	);
}

function handleActionClick(_actionData, _event) {
	// Checks primary action for url and opens the window in client
	if (primaryActionData && primaryActionData.url && primaryActionData.action === 'page') {
		if (clients.openWindow) return clients.openWindow(primaryActionData.url);
	}
	if (primaryActionData && primaryActionData.action === 'talk') {
		// TODO handle talk
	}
}

self.addEventListener('notificationclick', function (event) {
	var notificationData = event.notification.data;
	if (event.action) {
		// clicked an action
		var secondaryActionData = notificationData && notificationData[event.action];
		handleActionClick(secondaryActionData, event);
	} else {
		// clicked a notification
		var primaryActionData = notificationData && notificationData.primary_action;
		handleActionClick(primaryActionData, event);
	}
	event.notification.close();
});
