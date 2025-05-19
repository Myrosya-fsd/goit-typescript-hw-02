export interface User {
  name: string;
  links: {
    html: string;
  };
}

export interface Location {
  name?: string | null;
}

export interface UnsplashImage {
  id: string;
  alt_description?: string | null;
  user: User;
  location?: Location | null;
  urls: {
    small: string;
    regular: string;
  };
}

export interface FetchImagesResponse {
  images: UnsplashImage[];
  totalPages: number;
}
