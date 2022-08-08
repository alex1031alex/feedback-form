import React from "react";
import "./feedback-form.scss";

export const FeedbackForm = () => {
  return (
    <form className="feedback-form">
      <div className="feedback-form__group">
        <label className="feedback-form__label" htmlFor="feedback-form-name">Имя Фамилия</label>
        <input className="feedback-form__field" type="text" name="name" id="feedback-form-name" />
      </div>
      <div className="feedback-form__group">
        <label className="feedback-form__label" htmlFor="feedback-form-email">E-mail</label>
        <input className="feedback-form__field" type="email" name="email" id="feedback-form-email"  />
      </div>
      <div className="feedback-form__group">
        <label className="feedback-form__label" htmlFor="feedback-form-tel">Номер телефона</label>
        <input className="feedback-form__field" type="tel" name="tel" id="feedback-form-tel" />
      </div>
      <div className="feedback-form__group">
        <label className="feedback-form__label" htmlFor="feedback-form-birth">Дата рождения</label>
        <input className="feedback-form__field" type="date" name="birth" id="feedback-form-birth" />
      </div>
      <div className="feedback-form__group">
        <label className="feedback-form__label" htmlFor="feedback-form-text">Сообщение</label>
        <textarea className="feedback-form__field feedback-form__field--text" name="text" id="feedback-form-text" rows={4} />
      </div>
      <button className="feedback-form__btn" type="submit">Отправить</button>
    </form>
  );
};
