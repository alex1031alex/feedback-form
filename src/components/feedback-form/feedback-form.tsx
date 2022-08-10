import {
  ChangeEvent,
  FC,
  useState,
  FormEvent,
  KeyboardEvent,
  MouseEvent
} from "react";
import "./feedback-form.scss";
import "../error-message/error-message";
import { ErrorMessage } from "../error-message/error-message";
import { InputValues, InputErrors } from "../../types";
import { 
  maskTelNumber,
  Templates,
  INITIAL_VALUES,
  INITIAL_ERRORS 
} from "../../utils";

const TEST_URL = "https://httpbin.org/post";

export const FeedbackForm: FC = () => {
  const [inputErrors, setInputErrors] = useState<InputErrors>(INITIAL_ERRORS);
  const [inputValues, setInputValues] = useState<InputValues>(INITIAL_VALUES);
  const [isDisabled, setIsDisabled] = useState(false);
  const [sendStatusMessage, setSendStatusMessage] = useState("");

  const onNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setInputValues({...inputValues, "name": value});

    if (value === "") {
      setInputErrors({...inputErrors, "name": ""});
      return;
    }

    if (!Templates.NAME.test(value)) {
      setInputErrors({...inputErrors, "name": "Имя и фамилия должны быть записаны латинскими буквами и разделяться пробелом"});
    } else {
      setInputErrors({...inputErrors, "name": ""});
    }
    return;
  };

  const onEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.toLowerCase();
    setInputValues({...inputValues, "email": value});

    if (value === "") {
      setInputErrors({...inputErrors, "email": ""});
      return;
    }

    if (!Templates.EMAIL.test(value)) {
      setInputErrors({...inputErrors, "email": "Введите корректный e-mail"});
    } else {
      setInputErrors({...inputErrors, "email": ""});
    }
  };

  
  const onTelChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const value = evt.target.value;

    if (value === "") {
      setInputErrors({...inputErrors, "tel": ""})
      setInputValues({...inputValues, "tel": ""})
      return;
    }

    setInputValues((previousValues) => {
      return {...previousValues, "tel": maskTelNumber(value, previousValues.tel)}
    });

    if(value.trim().length !== 18) {
      setInputErrors({...inputErrors, "tel": "Введите 10 цифр вашего номера телефона без скобок и пробелов"});
    } else {
      setInputErrors({...inputErrors, "tel": ""});
    }
  };

  const onBirthChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    try {
      const date = new Date(value);
      if (date && date < new Date()) {
        setInputErrors({...inputErrors, "birth": ""});
        setInputValues({...inputValues, "birth": value});
      } else {
        setInputErrors({...inputErrors, "birth": "Введите корректную дату рождения"})
      }
    } catch {
      setInputErrors({...inputErrors, "birth": "Введите корректную дату рождения"})
    }
  };

  const onBirthKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    evt.preventDefault();
  };

  const onTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const value = evt.target.value;
    setInputValues({...inputValues, "text": value});

    if (value === "") {
      setInputErrors({...inputErrors, "text": ""});
      return;
    }

    if (value.length < 10 || value.length > 300) {
      setInputErrors({...inputErrors, "text": "Сообщение должно быть не короче 10 и не длинее 300 символов"});
    } else {
      setInputErrors({...inputErrors, "text": ""});
    }
  };

  const onResetBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    setInputErrors(INITIAL_ERRORS);
    setInputValues(INITIAL_VALUES);
    setSendStatusMessage("");
  };

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const emptyFieldEntry: [string, string] | undefined = Object.entries(inputValues).find(([, value]) => value === "");

    if (emptyFieldEntry !== undefined) {
      const [key, ] = emptyFieldEntry;
      setInputErrors({...inputErrors, [key]: "Поле не должно быть пустым"})
      return;
    }

    if (Object.values(inputErrors).find((value) => value !== "" )) {
      return;
    }

    const formData = new FormData();

    const [firstName, lastName] = inputValues.name.split(" ");
    const tel = inputValues.tel.replace(/[^\d]/g, "").slice(1);
    const birthDate = new Date(inputValues.birth).toString();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", inputValues.email);
    formData.append("tel", tel);
    formData.append("birth", birthDate);
    formData.append("text", inputValues.text);

    setIsDisabled(true);

    fetch(TEST_URL, {method: "POST", body: formData, headers: {"Content-type": "multipart/form-data"}})
      .then((response) => {
        if (response.status >=200 && response.status < 300) {
          setInputValues(INITIAL_VALUES);
          setSendStatusMessage(`Форма успешно отправлена! ${response.statusText}`);
        } else {
          const error = new Error(`${response.status} ${response.statusText}`);
          throw error
        }
      })
      .catch((error) => {
        setSendStatusMessage(`При отправке формы произошла ошибка ${error.message}`);
      })
      .finally(() => {
        setIsDisabled(false);
      });
  };

  return (
    <>
        <form className="feedback-form" onSubmit={onFormSubmit} noValidate>
        <div className="feedback-form__group">
          <label className="feedback-form__label" htmlFor="feedback-form-name">Имя Фамилия</label>
          <input 
            className="feedback-form__field feedback-form__field--name" type="text"
            name="name"
            value={inputValues.name}
            onChange={onNameChange}
            id="feedback-form-name"
            placeholder="Ivan Ivanov"
          />
          <ErrorMessage message={inputErrors.name} />       
        </div>
        <div className="feedback-form__group">
          <label className="feedback-form__label" htmlFor="feedback-form-email">E-mail</label>
          <input 
            className="feedback-form__field"
            type="email" name="email"
            value={inputValues.email}
            onChange={onEmailChange} 
            id="feedback-form-email" 
          />
          <ErrorMessage message={inputErrors.email} />
        </div>
        <div className="feedback-form__group">
          <label className="feedback-form__label" htmlFor="feedback-form-tel">Номер телефона</label>
          <input 
            className="feedback-form__field"
            type="tel"
            name="tel"
            value={inputValues.tel}
            onChange={onTelChange}
            placeholder="999 999 99 99"
            id="feedback-form-tel"
          />
          <ErrorMessage message={inputErrors.tel} />
        </div>
        <div className="feedback-form__group">
          <label className="feedback-form__label" htmlFor="feedback-form-birth">Дата рождения</label>
          <input 
            className="feedback-form__field"
            type="date"
            name="birth"
            value={inputValues.birth}
            onChange={onBirthChange}
            onKeyDown={onBirthKeyDown}
            id="feedback-form-birth"
          />
          <ErrorMessage message={inputErrors.birth} />
        </div>
        <div className="feedback-form__group">
          <label className="feedback-form__label" htmlFor="feedback-form-text">Сообщение</label>
          <textarea 
            className="feedback-form__field feedback-form__field--text" name="text" 
            id="feedback-form-text" 
            rows={4}
            value={inputValues.text}
            onChange={onTextChange}
          />
          <ErrorMessage message={inputErrors.text} />
        </div>
        <button className="feedback-form__btn feedback-form__btn--reset" type="reset" onClick={onResetBtnClick}>Очистить форму</button>
        <button className="feedback-form__btn feedback-form__btn--submit" type="submit" disabled={isDisabled}>Отправить</button>
      </form>
      {sendStatusMessage && <p className="feedback-form__status">{sendStatusMessage}</p>}
    </>
  );
};
