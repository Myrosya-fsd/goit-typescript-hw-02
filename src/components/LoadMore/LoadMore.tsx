//import React from "react";

type LoadMoreProps = {
  onClick: () => void;
  isVisible: boolean;
};

function LoadMore({ onClick, isVisible }: LoadMoreProps) {
  if (!isVisible) return null;

  return (
    <button onClick={onClick} style={{ marginTop: "30px" }}>
      Load more
    </button>
  );
}

export default LoadMore;
