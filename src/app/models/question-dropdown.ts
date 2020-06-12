import { PreguntaCaracteristica } from './pregunta-caracteristica';

export class DropdownQuestion extends PreguntaCaracteristica<string> {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}