export class PreguntaCaracteristica<T> {
    idPartida: string;
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    stat: string;
    options: {key: string, value: string}[];
    disabled: boolean;
  
    constructor(options: {
        idPartida?: string,
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        type?: string,
        stat?: string,
        disabled?: boolean,
      } = {}) {
      this.idPartida = options.idPartida || '';
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.type = options.type || '';
      this.stat = options.stat || '';
      this.disabled = options.disabled || false;
    }
  }