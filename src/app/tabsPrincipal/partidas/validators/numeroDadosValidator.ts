import { FormControl } from '@angular/forms';

export class NumeroDadosValidator {

    static isValid(control: FormControl): any {

        if(isNaN(control.value)){
            return {
                "not a number": true
            };
        }

        if(control.value % 1 !== 0){
            return {
                "not a whole number": true
            };
        }

        if(control.value < 1){
            return {
                "not much": true
            };
        }

        if (control.value > 60){
            return {
                "too much": true
            };
        }

        return null;
    }

}