import axios from 'axios';

export async function fetchContent(url: string) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch content from ${url}:`, error);
        return null;
    }
}
