import { FeedbackForm } from "../feedback-form/feedback-form";
import "./app.scss";

export const App = () => {
  return (
    <div className="app">
      <div className="app__container">
        <h1 className="app__title">Оставьте ваш отзыв</h1>
        <FeedbackForm />
      </div>
    </div>
  );
};
