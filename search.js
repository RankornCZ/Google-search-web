// search.js

function fetchResults(query, apiKey, cx)
{
    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;
    return fetch(apiUrl)
        .then(response => response.json());
}


// Creates a download link for the JSON data and triggers the download.
 // data - The JSON data to download.
 // filename - The filename to use for the download.
 
function downloadJSON(data, filename = 'results.json')
{
    // JSON string, Blob, and URL
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // Anchor
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
    // Download trigger
    anchor.click();

  // Clean up
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
