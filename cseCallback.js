// cseCallback.js

window.__gcse = {
    callback: function ()
    {
        console.log("Widget Loaded");
        var checkElements = setInterval(function ()
        {
            var searchInput = document.querySelector('input.gsc-input');
            var searchButton = document.querySelector('.gsc-search-button');
            if (searchInput && searchButton)
            {
                clearInterval(checkElements);
                console.log("Found search input:", searchInput);
                console.log("Found search button:", searchButton);

                // Helper function to process the query
                function processQuery()
                {
                    // Delay to allow the widget to process the search.
                    setTimeout(function ()
                    {
                        var query = searchInput.value.trim();
                        // Check if there's any input before proceeding.
                        if (!query)
                        {
                            console.log("No input provided. Query is empty.");
                            alert("Please enter a search query.");
                            return;
                        }
                        console.log("Widget query captured:", query);
                        fetchResults(query, window.apiKey, window.cx)
                            .then(data =>
                            {
                                window.searchResults = data;
                                document.getElementById('downloadBtn').style.display = 'inline';
                            })
                            .catch(error =>
                            {
                                console.error('Error fetching search results:', error);
                                alert('An error occurred while fetching the search results.');
                            });
                    }, 100);
                }

                // Event listeners
                searchInput.addEventListener('keydown', function (e)
                {
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        processQuery();
                    }
                });
                searchButton.addEventListener('click', processQuery);
            }
        }, 100);
    }
};
