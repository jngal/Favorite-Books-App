import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enBook from "./locales/en/book.json";
import enCommon from "./locales/en/common.json";
import skBook from "./locales/sk/book.json";
import skCommon from "./locales/sk/common.json";

export const defaultNS = "common";

const defaultLanguage =
  typeof navigator !== "undefined" &&
  navigator.language.toLowerCase().startsWith("sk")
    ? "sk"
    : "en";

void i18n.use(initReactI18next).init({
  lng: defaultLanguage,
  fallbackLng: "en",
  ns: ["common", "book"],
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      common: enCommon,
      book: enBook,
    },
    sk: {
      common: skCommon,
      book: skBook,
    },
  },
});

export default i18n;
