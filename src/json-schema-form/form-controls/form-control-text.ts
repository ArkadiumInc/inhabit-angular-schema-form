import { FormControlBase } from './form-control-base';

export class FormControlText extends FormControlBase<string> {
    controlType = 'text';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}