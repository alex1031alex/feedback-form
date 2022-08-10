type InputName = "name" | "email" | "tel" | "birth" | "text";

export type InputValues = {
  [key in InputName]: string
}

export type InputErrors = {
  [key in InputName]: string
}