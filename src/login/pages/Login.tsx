import type { JSX } from "keycloakify/tools/JSX";
import { useState, useEffect } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
//import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    // Initialize validation and floating labels when component mounts
    useEffect(() => {
        initFloatingLabels();
        initRealTimeValidation();
    }, []);

    const togglePassword = (fieldId: string): void => {
        const passwordField = document.getElementById(fieldId) as HTMLInputElement;
        if (!passwordField) return;
        
        const toggleButton = passwordField.parentElement?.querySelector('.password-toggle') as HTMLElement;
        if (!toggleButton) return;
        
        const eyeIcon = toggleButton.querySelector('.eye-icon') as HTMLElement;
        const eyeOpen = eyeIcon?.querySelector('.eye-open') as HTMLElement;
        const eyeClosed = eyeIcon?.querySelector('.eye-closed') as HTMLElement;

        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            if (eyeOpen && eyeClosed) {
                eyeOpen.style.display = 'block';
                eyeClosed.style.display = 'none';
            }
            toggleButton.setAttribute('aria-label', 'Hide password');
        } else {
            passwordField.type = 'password';
            if (eyeOpen && eyeClosed) {
                eyeOpen.style.display = 'none';
                eyeClosed.style.display = 'block';
            }
            toggleButton.setAttribute('aria-label', 'Show password');
        }
    };

    const validateField = (input: HTMLInputElement, validationFn: (value: string) => string | null): void => {
        const errorContainer = document.getElementById(input.name + '-error-container');
        const label = input.nextElementSibling as HTMLElement;
        
        // Clear previous errors
        clearFieldError(input, errorContainer, label);
        
        // Run validation
        const errorMessage = validationFn(input.value);
        
        if (errorMessage) {
            showFieldError(input, errorContainer, label, errorMessage);
        }
    };
      
    const validateUsername = (value: string): string | null => {
        if (!value || value.trim() === '') {
            return msgStr("fieldRequired");
        }
        return null;
    };
      
    const showFieldError = (input: HTMLInputElement, errorContainer: HTMLElement | null, label: HTMLElement | null, message: string): void => {
        // Add error classes
        input.classList.add('validation-error');
        input.setAttribute('aria-invalid', 'true');
        
        // Update label color
        if (label && label.classList.contains('mdc-floating-label')) {
            (label as HTMLElement).style.color = 'var(--error)';
        }
        
        // Show error message
        if (errorContainer) {
            errorContainer.innerHTML = '<div class="validation-error">' + message + '</div>';
        }
    };
      
    const clearFieldError = (input: HTMLInputElement, errorContainer: HTMLElement | null, label: HTMLElement | null): void => {
        // Remove error classes
        input.classList.remove('validation-error');
        input.setAttribute('aria-invalid', 'false');
        
        // Reset label color based on state
        if (label && label.classList.contains('mdc-floating-label')) {
            if (input === document.activeElement) {
                (label as HTMLElement).style.color = 'var(--primary)';
            } else {
                (label as HTMLElement).style.color = 'var(--text-secondary)';
            }
        }
        
        // Clear error message
        if (errorContainer) {
            errorContainer.innerHTML = '';
        }
    };

    const initFloatingLabels = (): void => {
        // Handle floating labels for all text fields
        const textFields = document.querySelectorAll('.mdc-text-field__input') as NodeListOf<HTMLInputElement>;
        
        textFields.forEach((input: HTMLInputElement) => {
            const label = input.nextElementSibling as HTMLElement;
          
            // Check initial state
            updateLabelState(input, label);
          
            // Add event listeners
            input.addEventListener('focus', () => {
                if (label && label.classList.contains('mdc-floating-label')) {
                    label.style.transform = 'translateY(-24px) scale(0.75)';
                    // Only change color to primary if there's no error
                    if (!input.classList.contains('validation-error')) {
                        label.style.color = 'var(--primary)';
                    }
                }
            });
          
            input.addEventListener('blur', () => {
                updateLabelState(input, label);
            });
          
            input.addEventListener('input', () => {
                updateLabelState(input, label);
            });
        });
    };
      
    const updateLabelState = (input: HTMLInputElement, label: HTMLElement | null): void => {
        if (!label || !label.classList.contains('mdc-floating-label')) return;
        
        // Check if input has value OR is currently focused
        if ((input.value && input.value.trim() !== '') || input === document.activeElement) {
            // Input has value OR is focused - float the label
            label.style.transform = 'translateY(-24px) scale(0.75)';
            // Keep error color if there's an error, otherwise use appropriate color
            if (!input.classList.contains('validation-error')) {
                if (input === document.activeElement) {
                    label.style.color = 'var(--primary)';
                } else {
                    label.style.color = 'var(--text-secondary)';
                }
            }
        } else {
            // Input is empty AND not focused - return label to original position
            label.style.transform = 'translateY(0) scale(1)';
            // Keep error color if there's an error, otherwise use secondary
            if (!input.classList.contains('validation-error')) {
                label.style.color = 'var(--text-secondary)';
            }
        }
    };

    const initRealTimeValidation = (): void => {
        const usernameInput = document.getElementById('username') as HTMLInputElement;
        
        // Real-time validation for username
        if (usernameInput) {
            usernameInput.addEventListener('input', () => {
                validateField(usernameInput, validateUsername);
            });
            
            usernameInput.addEventListener('blur', () => {
                validateField(usernameInput, validateUsername);
            });
        }
    };    

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container">
                    <div id="kc-registration">
                        <span>
                            {msg("noAccount")}{" "}
                            <a tabIndex={8} href={url.registrationUrl}>
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            <p className="sign-in-with">{msg("identity-provider-login-label")}</p>
                            <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                                {social.providers.map((...[p, , providers]) => (
                                    <li key={p.alias}>
                                            <span
                                                className="mb mdc-button mdc-button--outlined full"
                                                dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                            ></span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                        >
                            {!usernameHidden && (
                                <div className="mdc-text-field">
                                    <input 
                                        tabIndex={2} 
                                        id="username" 
                                        className="mdc-text-field__input" 
                                        name="username" 
                                        type="text"
                                        autoFocus
                                        autoComplete="off" 
                                        defaultValue={login.username ?? ""}
                                        required
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                        placeholder={!realm.loginWithEmailAllowed
                                             ? msgStr("username")
                                             : !realm.registrationEmailAsUsername
                                               ? msgStr("usernameOrEmail")
                                               : msgStr("email")}
                                        />
                                    <label htmlFor="username" className="mdc-floating-label">
                                        {!realm.loginWithEmailAllowed
                                                ? msgStr("username")
                                                : !realm.registrationEmailAsUsername
                                                ? msgStr("usernameOrEmail")
                                                : msgStr("email")}
                                    </label>
                                    {messagesPerField.existsError("username", "password") && (
                                        <span
                                            id="input-error"
                                            className={kcClsx("kcInputErrorMessageClass")}
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                            }}
                                        />
                                    )}
                                    <div id="username-error-container" className="validation-error-container"></div>
                                </div>
                            )}

                            <div className="mdc-text-field">
								<div className="mdc-text-field password-field">
                                    <input 
                                        tabIndex={3} 
                                        required 
                                        id="password" 
                                        className="mdc-text-field__input" 
                                        name="password" 
                                        type="password" 
                                        placeholder={msgStr("password")}
                                    />
                                    <label htmlFor="password" className="mdc-floating-label">
                                        {msgStr("password")}
                                    </label>
                                    <button type="button" className="password-toggle" onClick={() => togglePassword('password')}>
                                    <svg className="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path className="eye-open" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor" style={{display: 'none'}}/>
                                        <path className="eye-closed" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/>
                                    </svg>
                                    </button>
                                    {usernameHidden && messagesPerField.existsError("username", "password") && (
                                        <span
                                            id="input-error"
                                            className={kcClsx("kcInputErrorMessageClass")}
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                            }}
                                        />
                                    )}
                                    <div id="password-error-container" className="validation-error-container"></div>
                                </div>
                            </div>

                            <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="checkbox">
                                            <label>
                                                <input
                                                    tabIndex={5}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    defaultChecked={!!login.rememberMe}
                                                />{" "}
                                                {msg("rememberMe")}
                                            </label>
                                        </div>
                                    )}
                                </div>
                                <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                    {realm.resetPasswordAllowed && (
                                        <span>
                                            <a tabIndex={6} href={url.loginResetCredentialsUrl}>
                                                {msg("doForgotPassword")}
                                            </a>
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                <input
                                    tabIndex={7}
                                    disabled={isLoginButtonDisabled}
                                    className="mb mdc-button mdc-button--raised full"
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}