/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withExtraLanguages({ /* ... */ })
    .withCustomTranslations({
        // WARNING: You can't import the translation from external files
        en: {
            loginTitle: "Alon | Workplace Equity Platform",
            header1 :"Elevating the value of",
            header2 : "human work",
            subtitle : "Alon is a Workplace Equity Platform.",
            username : "Username",
            password : "Password",
            signIn : "Sign in",
            signInWith : "Or sign in with"
        },
        // cspell: enable
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
