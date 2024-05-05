export function isValidEmail(string: string): boolean {
    const emailRegex: RegExp = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return !!string.match(emailRegex);
}

export function isValidPassword(string: string): boolean {
    const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()])\S{6,16}$/;
    return !!string.match(passwordRegex);
}

export function isValidUsername(string: string): boolean {
    const usernameRegex: RegExp = /^[a-zA-Z0-9]{5,23}$/;
    return !!string.match(usernameRegex);
}
