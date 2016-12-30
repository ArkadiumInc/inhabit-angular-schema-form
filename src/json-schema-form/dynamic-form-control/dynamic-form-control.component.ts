import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { FormControlBase } from '../form-controls/form-control-base';

@Component({
    selector: 'df-control',
    templateUrl: './dynamic-form-control-material.component.html',
    styleUrls: ['./dynamic-form-control.component.less']
})
export class DynamicFormControlComponent {
    @Input() control: FormControlBase<any>;
    @Input() form: FormGroup;

    get isValid() {
        return this.form.controls[this.control.key].valid;
    }
}