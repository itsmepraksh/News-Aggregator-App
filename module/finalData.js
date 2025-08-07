
import { fetchData } from "./fetchData.js"; 

 

export async function getData() {


    let newsData = []

    try {

        const fetchedData = await fetchData("https://saurav.tech/NewsAPI/top-headlines/category/health/in.json")

        // console.log(fetchedData.articles)
        newsData = fetchedData.articles

    } 
    catch (err) {

        if (err.message.includes('HTTP Error')) {
            console.error('API IS NOT FOUND OR SERVER UNREACHEABLE');
        } else if (err.message.includes('Invalid Json')) {
            console.error("RESPONSE DATA IS NOT JSON")
        } else if (err.message.includes("Failed to fetch")) {
            console.error("NETWORK ERROR or server not reachable");
        } else {
            console.error("UNKNOWN ERROR:", err.message)
        }

        console.warn('FallBack data is showing...')
        await new Promise((resolve) => setTimeout(resolve(), 1000))
        console.warn('dummy data loading...')

        newsData = [
            {
                "author": "Example News",
                "content": "A recent study on urban mobility shows surprising trends in commuter behavior. \r\nThe study, published in the Global Journal of Transportation, found that... [+2300 chars]",
                "description": "Commuter patterns have changed significantly post-pandemic, with remote work and electric scooters playing a larger role in city travel.",
                "publishedAt": "2025-08-01T09:15:00Z",
                "source": {
                    "id": null,
                    "name": "ExampleNews"
                },
                "title": "Urban Commuter Trends Shift Post-Pandemic, Study Finds - Example News",
                "url": "https://www.examplenews.com/article/urban-commuter-trends-2025",
                "urlToImage": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }


        ]
    } 
    return newsData

}
