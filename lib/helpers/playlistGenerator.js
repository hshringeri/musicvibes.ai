const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getPlaylist = async(mood) => {
    try {
        console.log(mood)
        console.log("holla")
        const response = await fetch(`${BASE_URL}/api/playlistGenerator?mood=${mood}`);
        console.log("looking for bug")
        const playlist = await response.json()
        return [playlist]
    } catch (error) {
        console.error('Failed to get playlist:', error);
        throw error;
    }

}

export const createPlaylist = async(playlistData) => {
    try {
        console.log("whatsup")
        console.log(playlistData)
        const Options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(playlistData)
        };

        const response = await fetch(`${BASE_URL}/api/playlistGenerator`, Options);

        const json = await response.json()
        return json


    } catch (error) {
        console.log(error)
    }
}
