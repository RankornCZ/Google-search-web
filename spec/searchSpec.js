describe("fetchResults", function ()
{
    it("should return a valid response object", function (done)
    {
        console.log("Starting test: calling fetchResults");
        fetchResults("lednice", "", "") //Add credentials here
            .then(data =>
            {
                console.log("Promise resolved. Data received:", data);
                expect(data).toBeDefined();
                done();
            })
            .catch(error =>
            {
                console.log("Promise rejected. Error:", error);
                fail("Fetch failed: " + error);
                done();
            });
    });
});

describe("downloadJSON", function ()
{
    it("should create an anchor element with correct attributes and trigger a click", function ()
    {
        // Store the original createElement function.
        const originalCreateElement = document.createElement;

        spyOn(document, 'createElement').and.callFake(function (tagName)
        {
            if (tagName === 'a')
            {
                const realAnchor = originalCreateElement.call(document, 'a');
                spyOn(realAnchor, 'click').and.callThrough();
                return realAnchor;
            }
            return originalCreateElement.call(document, tagName);
        });

        const dummyData = { key: "value" };

        // Call downloadJSON with dummyData and a test filename.
        downloadJSON(dummyData, "dummy.json");

        expect(document.createElement).toHaveBeenCalledWith('a');
        const anchor = document.createElement.calls.mostRecent().returnValue;

        // Instead of checking for a specific data URL, check that the href starts with 'blob:'
        expect(anchor.href).toMatch(/^blob:/);
        expect(anchor.download).toEqual("dummy.json");
        expect(anchor.click).toHaveBeenCalled();
    });
});



