/**
 * Password validator for login pages
 */

import value from 'assets/scss/_themes-vars.module.scss';

// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor = (count) => {
    if (count < 2) return { label: '너무짧아요😱', color: value.errorMain };
    if (count < 3) return { label: '아직도..짧아요😢', color: value.warningDark };
    if (count < 4) return { label: '좀만더..길게!🙃', color: value.orangeMain };
    if (count < 5) return { label: '좋은데요!😀', color: value.successMain };
    if (count < 6) return { label: '완전좋아요!😲', color: value.successDark };
    return false;
};

// password strength indicator
export const strengthIndicator = (number) => {
    let strengths = 0;
    if (number.length > 5) strengths += 1;
    if (number.length > 7) strengths += 1;
    if (hasNumber(number)) strengths += 1;
    if (hasSpecial(number)) strengths += 1;
    if (hasMixed(number)) strengths += 1;
    return strengths;
};
