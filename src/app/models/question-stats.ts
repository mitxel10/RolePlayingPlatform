import { PreguntaCaracteristica } from './pregunta-caracteristica';

export class StatsQuestion extends PreguntaCaracteristica<string> {
  controlType = 'stats';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}