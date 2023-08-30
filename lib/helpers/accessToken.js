const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAccessToken = async(code)  => {
    try {
        console.log("super cool")
        console.log(code)
        const response = await fetch(`${BASE_URL}/api/callback?code=${code}`);
        const accessToken = await response.json()
        console.log("hi")
        console.log(accessToken)
        return accessToken
    } catch (error) {
        console.error('Failed to get playlist:', error);
        throw error;
    }


}