import { useState, useEffect } from "react";
import { fetchImages } from "../services/api";
import ImageGallery from "./ImageGallery/ImageGallery";
import SearchBar from "./SearchBar/SearchBar";
import { Loader } from "./Loader/Loader";
import LoadMore from "./LoadMore/LoadMore";
import "./App.css";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import toast from "react-hot-toast";
import ImageModal from "./ImageModal/ImageModal";
import type { UnsplashImage, FetchImagesResponse } from "../types";

function App() {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [query, setQuery] = useState<string>("palma");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [isErrorMessage, setIsErrorMessage] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(
    null
  );
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (!query.trim()) return;

    const getData = async () => {
      try {
        setIsLoading(true);
        setIsErrorMessage(false);
        const data: FetchImagesResponse = await fetchImages(query, page);
        if (data.images.length === 0 && page === 1) {
          setIsEmpty(true);
          return;
        }
        setImages((prev) => [...prev, ...data.images]);
        setMaxPage(data.totalPages);
        setIsEmpty(false);
      } catch (error) {
        console.error(error);
        setIsErrorMessage(true);
        toast.error("Try again later...");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [query, page]);

  const handleChangeQuery = (newQuery: string) => {
    toast.success(`Query changed to ${newQuery}`);
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const canLoadMore = page < maxPage && !isLoading;

  return (
    <>
      <header className="header">
        <SearchBar handleChangeQuery={handleChangeQuery} />
      </header>
      <div className="container">
        <ImageGallery
          images={images}
          onImageClick={(image) => setSelectedImage(image)}
        />
      </div>
      {isErrorMessage && <ErrorMessage message="Server is dead..." />}
      {isLoading && <Loader />}
      <LoadMore onClick={() => setPage(page + 1)} isVisible={canLoadMore} />
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
      {isEmpty && (
        <p className="info-message">No images found for "{query}".</p>
      )}
    </>
  );
}

export default App;
