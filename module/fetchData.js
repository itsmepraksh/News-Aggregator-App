 

export async function fetchData(url, retries = 3, delay = 1500) {

    for (let i = 0; i < retries; i++) {
        try {
            let rawResponse = await fetch(url)
            // console.log(rawResponse)

            if (!rawResponse.ok) {
                throw new Error(`HTTP Error: ${rawResponse.status}`);
            }

            try {
                let responseData = await rawResponse.json();
                return responseData

            } catch (err) {
                throw new Error(`Invalid Json format received`);
            }
        } catch (err) {
            console.warn(`Fetch Attempt failed ${i + 1}`, err.message);

            if (i < retries - 1) {
                await new Promise((resolve) => setTimeout(() => resolve(), delay))
            } else throw err;
        }

    }
    return null;
}