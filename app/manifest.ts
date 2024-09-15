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
		description: 'MBOX',
		start_url: '/',
		display: 'standalone',
		background_color: '#fff',
		theme_color: '#fff',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
		],
	}
}
