import { FormGroup, FormControl } from '@angular/forms';

//Allow Alphanumeric charachters and space only
export class TextFieldValidator {
    static validTextField(fc: FormControl) {
        if (fc.value || fc.value != undefined || fc.value != '') {
            const regex = /^[0-9a-zA-Z ]+$/;
            if (regex.test(fc.value)) {
                return (null);
            } else {
                return ({ validTextField: true });
            }

        } else {
            return ({ validTextField: true });
        }
    }
}

// Allow Numeric Characters Only - Validation
export class NumericFieldValidator {
    static validNumericField(fc: FormControl) {
        if (fc.value || fc.value != undefined || fc.value != '') {
            const regex = /[0-9]/;
            if (regex.test(fc.value)) {
                return (null);
            } else {
                return ({ validNumericField: true });
            }

        } else {
            return ({ validNumericField: true });
        }
    }
}

// Allow Characters and Space Only - Validation
export class OnlyCharFieldValidator {
    static validOnlyCharField(fc: FormControl) {
        if (fc.value || fc.value != undefined || fc.value != '') {
            const regex = /^[a-zA-Z]*$/;
            if (regex.test(fc.value)) {
                return (null);
            } else {
                return ({ validOnlyCharField: true });
            }

        } else {
            return ({ validOnlyCharField: true });
        }
    }
}

//Validate Email
export class EmailValidator {
    static validEmail(fc: FormControl) {
        if (fc.value || fc.value != undefined || fc.value != '') {
            const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
            if (regex.test(fc.value)) {
                return (null);
            } else {
                return ({ validEmail: true });
            }

        } else {
            return ({ validEmail: true });
        }
    }
}

// Only White space not allowed
export class NotWhiteSpaceValidator {
    static notWhiteSpaceValidator(fc: FormControl) {
        if (fc.value || fc.value != undefined ) {
           
            const isWhiteSpace = (fc.value).trim().length===0;
            const isValid = !isWhiteSpace;

            if (isValid) {
                return (null);
            } else {
                return ({ notWhiteSpaceValidator: true });
            }

        } else {
            return ({ notWhiteSpaceValidator: true });
        }
    }
}


// Custom Validators to check two fields match
export function MustMatchValidators(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
    
}