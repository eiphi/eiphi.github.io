/* eslint-disable */
'use strict';

self.addEventListener('push', function (event) {
	console.log('[Service Worker] Push Received.');
	console.log('[Service Worker] Push had this data:', event.data.text());

	var title = event.data.json().title;
	var options = event.data.json();

	event.waitUntil(self.registration.showNotification(title, options));
});

function openUrl(_event, _url) {
	_event.waitUntil(
		clients
			.matchAll({
				type: 'window'
			})
			.then(function (clientList) {
				for (var i = 0; i < clientList.length; i++) {
					var client = clientList[i];
					if (client.url === _url && 'focus' in client) {
						_event.notification.close();
						return client.focus();
					}
				}
				if (clients.openWindow) {
					_event.notification.close();
					return clients.openWindow(_url);
				}
			})
	);
}

function handleActionClick(_event, _actionData) {
	// Checks primary action for url and opens the window in client
	if (_actionData && _actionData.action === 'page' && _actionData.url) {
		openUrl(_event, _actionData.url);
	}
	if (_actionData && _actionData.action === 'talk') {
		_event.notification.close();
		// TODO handle talk
	}
}

self.addEventListener('notificationclick', function (event) {
	var notificationData = event.notification.data;
	if (event.action) {
		// clicked an action
		var secondaryActionData = notificationData && notificationData[event.action];
		handleActionClick(event, secondaryActionData);
	} else {
		// clicked a notification
		var primaryActionData = notificationData && notificationData.primary_action;
		handleActionClick(event, primaryActionData);
	}
});
