import React, { FC } from "react";
import "./error-message.scss";

type TProps = {
  message: string
}

export const ErrorMessage: FC<TProps> = (props) => {
  const {message} = props;
 
  if (message.length > 0) {
    return <p className="error-message">{message}</p>
  }

  return null;
};
