/* eslint-disable */
'use strict';

self.addEventListener('push', function (event) {
	console.log('[Service Worker] Push Received.');
	console.log('[Service Worker] Push had this data:', event.data.text());
	console.log('Using temp script');

	var title = event.data.json().title;
	var options = event.data.json();

	event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function  (event)  {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then((clientList) => {
    for (const client of clientList) {
      if (client.url === '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('/');
  }));
});
