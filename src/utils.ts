export const INITIAL_VALUES = {
  "name": "",
  "email": "",
  "tel": "",
  "birth": "",
  "text": "",
};

export const INITIAL_ERRORS = {
  "name": "",
  "email": "",
  "tel": "",
  "birth": "",
  "text": "",
}

export const Templates = {
  NAME: /^[A-z]+\s[A-z]+$/,
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  TEL: /[^\d]/g
};

export const maskTelNumber = (value: string, previousValue: string): string => {
  if (!value) {
    return "";
  }

  const currentValue = value.length > 1 ? 
  value.replace(Templates.TEL, "").slice(1) : 
  value.replace(Templates.TEL, "");

  if (!previousValue || value.length > previousValue.length) {
    if (currentValue.length < 4) {
      return `+7 (${currentValue}`;
    }

    if (currentValue.length < 7) {
      return `+7 (${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    }

    if (currentValue.length < 9) {
      return `+7 (${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)} ${currentValue.slice(6, 8)}`;
    }

    return `+7 (${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)} ${currentValue.slice(6, 8)} ${currentValue.slice(8, 10)}`;
  }

  return value;
};
