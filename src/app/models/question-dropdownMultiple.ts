import { PreguntaCaracteristica } from './pregunta-caracteristica';

export class DropdownMultipleQuestion extends PreguntaCaracteristica<string> {
  controlType = 'dropdownMultiple';
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}