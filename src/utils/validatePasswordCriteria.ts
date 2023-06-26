export default function validatePasswordCriteria(password: string): boolean {
    const minLength = 6;
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    const capitalLetters = /[A-Z]/;
    const smallLetters = /[a-z]/;
    const digits = /[0-9]/;

    // Check length
    if (password.length < minLength) {
        return false;
    }

    // Check special character
    if (!specialChars.test(password)) {
        return false;
    }

    // Check capital letter
    if (!capitalLetters.test(password)) {
        return false;
    }

    // Check small letter
    if (!smallLetters.test(password)) {
        return false;
    }

    // Check digit
    if (!digits.test(password)) {
        return false;
    }

    // Password meets all criteria
    return true;
}
