import { FormControlBase} from './form-control-base';

export class FormControlSelect extends FormControlBase<string> {
    controlType = 'select';
    options: {key: string, value: string}[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}