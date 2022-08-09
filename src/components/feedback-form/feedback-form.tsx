import React, {FC, useState} from "react";
import "./feedback-form.scss";
import "../error-message/error-message";
import { ErrorMessage } from "../error-message/error-message";

type InputErrors = {
  name: string,
  email: string,
  tel: string,
  birth: string,
  text: string
};

export const FeedbackForm: FC = () => {
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    "name": "",
    "email": "",
    "tel": "",
    "birth": "",
    "text": "",
  });

  return (
    <form className="feedback-form" noValidate>
      <div className="feedback-form__group">
        <label className="feedback-form__label" htmlFor="feedback-form-name">Имя Фамилия</label>
        <input className="feedback-form__field feedback-form__field--name" type="text" name="name" id="feedback-form-name" placeholder="Ivan Ivanov" />
        <ErrorMessage message={inputErrors.name} />       
      </div>
      <div className="feedback-form__group">
        <label className="feedback-form__label" htmlFor="feedback-form-email">E-mail</label>
        <input className="feedback-form__field" type="email" name="email" id="feedback-form-email"  />
        <ErrorMessage message={inputErrors.email} />
      </div>
      <div className="feedback-form__group">
        <label className="feedback-form__label" htmlFor="feedback-form-tel">Номер телефона</label>
        <input className="feedback-form__field" type="tel" name="tel" id="feedback-form-tel" />
        <ErrorMessage message={inputErrors.tel} />
      </div>
      <div className="feedback-form__group">
        <label className="feedback-form__label" htmlFor="feedback-form-birth">Дата рождения</label>
        <input className="feedback-form__field" type="date" name="birth" id="feedback-form-birth" />
        <ErrorMessage message={inputErrors.birth} />
      </div>
      <div className="feedback-form__group">
        <label className="feedback-form__label" htmlFor="feedback-form-text">Сообщение</label>
        <textarea className="feedback-form__field feedback-form__field--text" name="text" id="feedback-form-text" rows={4} />
        <ErrorMessage message={inputErrors.text} />
      </div>
      <button className="feedback-form__btn" type="submit">Отправить</button>
    </form>
  );
};
