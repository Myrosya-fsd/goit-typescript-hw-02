import axios from "axios";

const accessKey = "wDJrbgc-60N-AInSrRu3zVgvzFFQFzf7dDE5aFukdrc";

interface User {
  id: string;
  username: string;
  name: string;
  links: {
    html: string;
  };
}

interface Location {
  name?: string | null;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

interface Image {
  id: string;
  alt_description?: string | null;
  user: User;
  location?: Location | null;
  urls: Urls;
}

// Опис структури відповіді API
interface UnsplashApiResponse {
  results: Image[];
  total_pages: number;
}

interface FetchImagesResponse {
  images: Image[];
  totalPages: number;
}

export const fetchImages = async (
  query: string,
  page: number
): Promise<FetchImagesResponse> => {
  const response = await axios.get<UnsplashApiResponse>(
    "https://api.unsplash.com/search/photos",
    {
      params: {
        query,
        page,
        client_id: accessKey,
      },
    }
  );

  return {
    images: response.data.results,
    totalPages: response.data.total_pages,
  };
};
