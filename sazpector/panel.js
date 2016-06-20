// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.extension.*



setInterval(getGameState(renderState), 500);

function getGameState(done) {
	chrome.devtools.inspectedWindow.eval("gameState", done);
}

function renderState(result, isException) {
	var editor = new JSONEditor(document.getElementById("divInspector"), {});
	editor.set(result);	
}