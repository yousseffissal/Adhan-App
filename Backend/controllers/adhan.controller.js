const FetchAdhanTime = async (req, res) => {
    const city = req.params.city;
    const date = req.params.date;
    try {
        const response = await fetch(
            `https://api.aladhan.com/v1/timingsByCity/${date}?city=${city}&country=Morocco&method=21`
        );

        if (!response.ok) {
            return res.status(response.status).json({
                error: "Failed to fetch prayer times from external API"
            });
        }

        const data = await response.json();

        if (!data || data.code !== 200) {
            return res.status(404).json({
                error: "There is no time calendar for this city"
            });
        }

        return res.status(200).json({
            message: "Adhan calendar retrieved successfully.",
            data: data.data.timings
        });

    } catch (error) {
        console.error("Error processing the request:", error);

        return res.status(500).json({
            error: "An error occurred while processing the request."
        });
    }
};

module.exports = {
    FetchAdhanTime
};
