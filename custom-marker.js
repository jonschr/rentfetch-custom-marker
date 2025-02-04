// custom-marker.js
jQuery(document).ready(function ($) {
	console.log('Custom markers script loaded');

	let customMarkers = [];

	// SVG Marker definitions
	const markerIcons = {
		// DU specific logo
		du: {
			path: 'M53.17,13H29.38v4.85l2.55,1.35V52.67H53.17a2.47,2.47,0,0,0,2.46-2.47V15.46A2.47,2.47,0,0,0,53.17,13 M93,13a2.48,2.48,0,0,0-2.47,2.47V51.2a19,19,0,0,1-19,19H35A21.75,21.75,0,0,0,53.6,80.8H92.49A21.76,21.76,0,0,0,114.25,59V19.19l2.56-1.35V13Z M68.93,0H0V4.84L3.54,6.71V59.5L0,61.37v4.84H68.93A16.44,16.44,0,0,0,85.37,49.77V16.44A16.44,16.44,0,0,0,68.93,0M61.47,51a5.88,5.88,0,0,1-5.88,5.88H26v-48H55.59a5.88,5.88,0,0,1,5.88,5.88Z',
			fillColor: '#ba0c2f',
			scale: 0.3,
			anchor: new google.maps.Point(57, 40),
		},
		// Generic university marker in different colors
		// Add your specific university SVGs here when ready
		generic1: {
			path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
			fillColor: '#1f3d7a', // Navy blue
			scale: 2,
			anchor: new google.maps.Point(12, 22),
		},
		generic2: {
			path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
			fillColor: '#2d8659', // Forest green
			scale: 2,
			anchor: new google.maps.Point(12, 22),
		},
		generic3: {
			path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
			fillColor: '#7d3f98', // Purple
			scale: 2,
			anchor: new google.maps.Point(12, 22),
		},
	};

	// Array of Colorado universities with their specific marker configurations
	const universities = [
		{
			name: 'University of Denver',
			lat: 39.6766,
			lng: -104.9619,
			icon: 'du', // Uses DU specific logo
		},
		{
			name: 'University of Colorado Boulder',
			lat: 40.0076,
			lng: -105.2659,
			icon: 'generic1', // Uses navy blue marker
			// Future: icon: 'cu' for CU specific logo
		},
		{
			name: 'Colorado State University',
			lat: 40.5734,
			lng: -105.0865,
			icon: 'generic2', // Uses forest green marker
			// Future: icon: 'csu' for CSU specific logo
		},
		{
			name: 'University of Colorado Denver',
			lat: 39.7446,
			lng: -105.0027,
			icon: 'generic3', // Uses purple marker
			// Future: icon: 'ucd' for UCD specific logo
		},
		// Add more universities as needed
	];

	function addCustomMarkers(mapInstance, existingMarkers) {
		// Remove existing custom markers if they exist
		customMarkers.forEach((marker) => {
			marker.setMap(null);
		});
		customMarkers = [];

		try {
			// Add marker for each university
			universities.forEach((university) => {
				console.log(`Creating marker for ${university.name}`);

				const position = new google.maps.LatLng(
					university.lat,
					university.lng
				);

				// Get the appropriate icon configuration
				const iconConfig = {
					...markerIcons[university.icon], // Spread the base icon configuration
					fillOpacity: 1,
					strokeWeight: 0,
				};

				const marker = new google.maps.Marker({
					position: position,
					map: mapInstance,
					icon: iconConfig,
					clickable: false,
				});

				// Add to our tracking array
				customMarkers.push(marker);

				// Add to existing markers array
				existingMarkers.push(marker);
			});

			console.log('University markers added successfully');
		} catch (error) {
			console.error('Error adding university markers:', error);
		}
	}

	// Register our hook only once
	if (typeof window.rentFetchMapHooks === 'undefined') {
		window.rentFetchMapHooks = [];
	}

	// Only add the hook if it hasn't been added before
	if (!window.rentFetchMapHooks.includes(addCustomMarkers)) {
		window.rentFetchMapHooks.push(addCustomMarkers);
	}
});
