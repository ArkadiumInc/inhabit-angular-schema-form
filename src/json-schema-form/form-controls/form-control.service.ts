import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormControlBase } from './form-control-base';
import { FormControlText } from './form-control-text';
import { FormControlSelect } from './form-control-select';

@Injectable()
export class FormControlService {
    constructor() {
    }

    toFormGroup(formControls: FormControlBase<any>[]) {
        let group: any = {};

        formControls.forEach(formControl => {
            group[formControl.key] = formControl.required ? new FormControl(formControl.value || '', Validators.required)
                : new FormControl(formControl.value || '');
        });
        return new FormGroup(group);
    }
}