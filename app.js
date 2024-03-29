
const beautifyButton = document.getElementById('beautify-button');
const htmlCode = document.getElementById('html-code');
const beautifiedCode = document.getElementById('beautified-code');

function clearInput() {
	document.getElementById("html-code").value = "";
}

async function pasteFromClipboard() {
	const text = await navigator.clipboard.readText();
	document.getElementById("html-code").value = text;
}

beautifyButton.addEventListener('click', () => {
	// Import the HTML as a string
	const html = document.getElementById('html-code').value;
	// Use regular expressions to add indentation and line breaks
	let indentationLevel = 0;
	const beautifiedHtml = html.replace(/(<\/?[^>]+>)/g, function(match) {
		if(match.startsWith('</')) {
			indentationLevel--;
		}
		let result = '\n' + '  '.repeat(indentationLevel) + match;
		if(!match.startsWith('</')) {
			indentationLevel++;
		}
		return result;
	}).replace(/[\n]+/g, '\n').replace(/^\n|\n$/g, '');
	document.getElementById('beautified-code').textContent = beautifiedHtml;
})

const copyButton = document.getElementById('copy-button');

copyButton.addEventListener('click', () => {
	const tempTextarea = document.createElement('textarea');
	tempTextarea.value = beautifiedCode.textContent;
	document.body.appendChild(tempTextarea);
	tempTextarea.select();
	document.execCommand('copy');
	document.body.removeChild(tempTextarea);
});
