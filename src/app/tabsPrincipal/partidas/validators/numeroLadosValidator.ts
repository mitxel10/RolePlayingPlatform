import { FormControl } from '@angular/forms';

export class NumeroLadosValidator {

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

        if(control.value < 2){
            return {
                "not much": true
            };
        }

        if (control.value > 20){
            return {
                "too much": true
            };
        }

        return null;
    }

}