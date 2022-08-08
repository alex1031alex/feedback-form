import React from "react";
import { FeedbackForm } from "../feedback-form/feedback-form";
export const App = () => {
  return (
    <div className="app">
      <div className="container">
        <h1 className="app__label">Форма обратной связи</h1>
        <FeedbackForm />
      </div>
    </div>
  );
};
