// Can use
// chrome.devtools.*
// chrome.extension.*

// Create a tab in the devtools area
chrome.devtools.panels.create(
	"sazpector", 
	"toast.png", 
	"panel.html", 
	function(panel) {
		console.log(panel);

		panel.createSidebarPane("Game State",
			function(sidebar) {
				sidebar.setObject({x: 5, y: 100});
			});
	});