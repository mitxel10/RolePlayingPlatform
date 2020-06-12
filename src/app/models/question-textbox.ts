import { PreguntaCaracteristica } from './pregunta-caracteristica';

export class TextboxQuestion extends PreguntaCaracteristica<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}