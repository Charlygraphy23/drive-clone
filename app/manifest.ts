// {
// 	"name": "MBOX",
// 	"short_name": "MBOX",
// 	"start_url": "/",
// 	"display": "standalone",
// 	"description": "A description for your application",
// 	"lang": "en-US",
// 	"dir": "auto",
// 	"theme_color": "#000000",
// 	"background_color": "#000000",
// 	"orientation": "any",
// 	"icons": [
// 		{
// 			"src": "/android-chrome-192x192.png",
// 			"sizes": "192x192",
// 			"type": "image/png"
// 		},
// 		{
// 			"src": "/android-chrome-384x384.png",
// 			"sizes": "384x384",
// 			"type": "image/png"
// 		}
// 	],
// 	"screenshots": [
// 		{
// 			"src": "https://www.pwabuilder.com/assets/screenshots/screen1.png",
// 			"sizes": "2880x1800",
// 			"type": "image/png",
// 			"description": "A screenshot of the home page"
// 		}
// 	]
// }


import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'MBOX',
		short_name: 'MBOX',
		description: 'A file storage app',
		start_url: '.',
		display: 'standalone',
		background_color: '#fff',
		theme_color: '#6a29ff',
		icons: [
			{
				"src": "/assets/favicon-16x16.png",
				"sizes": "16x16",
				"type": "image/png",
				"purpose": "any"
			},
			{
				"src": "/assets/favicon-32x32.png",
				"sizes": "32x32",
				"type": "image/png",
				"purpose": "any"
			},
			{
				"src": "/assets/android-chrome-192x192.png",
				"sizes": "192x192",
				"type": "image/png",
				"purpose": "any"
			},
			{
				"src": "/assets/android-chrome-384x384.png",
				"sizes": "384x384",
				"type": "image/png",
				"purpose": "any"
			},

		],
		"screenshots": [
			{
				"src": "https://github.com/user-attachments/assets/97213643-42ed-461c-8bff-4dbf41039431",
				"sizes": "3360x1786",
				"type": "image/png",
				"description": "A file storage app",
				"form_factor": "wide"
			},
			{
				"src": "https://github.com/user-attachments/assets/1b86563b-8ec8-4c9b-bbac-e90aa7aecec0",
				"sizes": "3360x1786",
				"type": "image/png",
				"description": "A file storage app",
				"form_factor": "wide"
			},
			{
				"src": "https://github.com/user-attachments/assets/45c8a158-88ca-4476-85d5-55cb861d5a40",
				"sizes": "782x1684",
				"type": "image/png",
				"description": "A file storage app",
				"form_factor": "narrow"
			}
		]
	}
}
