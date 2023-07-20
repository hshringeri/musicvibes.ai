const BASE_URL='http://localhost:3000'

export const getPlaylist = async(mood) => {
    try {
        console.log(mood)
        const response = await fetch(`${BASE_URL}/api/playlistGenerator?mood=${mood}`);
        const playlist = await response.json()
        return [playlist]
    } catch (error) {
        console.error('Failed to get playlist:', error);
        throw error;
    }

}
