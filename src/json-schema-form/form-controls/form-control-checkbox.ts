import { FormControlBase } from './form-control-base';

export class FormControlCheckbox extends FormControlBase<string> {
    controlType = 'checkbox';
    type: boolean;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}