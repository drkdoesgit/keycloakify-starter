import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
// import "./resources/template-theme.css";
const UserProfileFormFields = lazy(    () => import("./UserProfileFormFields"));
const Login = lazy(() => import("./pages/Login"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));
const LoginPageExpired = lazy(() => import("./pages/LoginPageExpired"));
const Info = lazy(() => import("./pages/Info"));
const Error = lazy(() => import("./pages/Error"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "error.ftl": return (
                        <Error
                            {...{ kcContext, i18n, classes }}
                            Template={Template}
                            doUseDefaultCss={true}
                        />
                    );                    
                    case "info.ftl": return (
                        <Info
                            {...{ kcContext, i18n, classes }}
                            Template={Template}
                            doUseDefaultCss={true}
                        />
                    );
                    case "login.ftl": return (
                        <Login
                            {...{ kcContext, i18n, classes }}
                            Template={Template}
                            doUseDefaultCss={true}
                        />
                    );
                    case "login-verify-email.ftl": return (
                        <LoginVerifyEmail
                            {...{ kcContext, i18n, classes }}
                            Template={Template}
                            doUseDefaultCss={true}
                        />
                    );
                    case "login-page-expired.ftl": return (
                        <LoginPageExpired
                            {...{ kcContext, i18n, classes }}
                            Template={Template}
                            doUseDefaultCss={true}
                        />
                    );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
