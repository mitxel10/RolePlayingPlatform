import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { PreguntaCaracteristica }              from '../../../models/pregunta-caracteristica';
import { QuestionsService }    from '../../../services/questions-service/questions.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [ QuestionsService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: PreguntaCaracteristica<string>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionsService) {  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}