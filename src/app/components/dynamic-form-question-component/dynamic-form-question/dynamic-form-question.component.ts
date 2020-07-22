import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl }        from '@angular/forms';

import { PreguntaCaracteristica }     from '../../../models/pregunta-caracteristica';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss'],
})
export class DynamicFormQuestionComponent implements OnInit {

  @Input() question: PreguntaCaracteristica<string>;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {}

  get isValid() { 
    return this.form.controls[this.question.key].valid; 
  }

  onCheckChange(event) {
    //console.log(this.form.controls[this.question.key].value);
    let value = this.form.controls[this.question.key].value;
    
    if(event.target.checked){
      this.form.controls[this.question.key].setValue(value.concat("," + event.target.value));
      console.log(this.form.controls[this.question.key].value);
    }
    else{
      var array = value.split(',');
      const index: number = array.indexOf(event.target.value);
      if (index !== -1) {
        array.splice(index, 1);
      }
      this.form.controls[this.question.key].setValue(array.join(","));
      console.log(this.form.controls[this.question.key].value);
    }
  }

  isChecked(key) {
    var array = this.form.controls[this.question.key].value.split(',');
    const index: number = array.indexOf(key);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  }
}
