//import React from "react";

type ErrorMessageProps = {
  message: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
}

export default ErrorMessage;
