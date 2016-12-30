import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormControlService } from '../form-controls/form-control.service';

import { FormControlBase } from '../form-controls/form-control-base';

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    providers: [FormControlService]
})
export class DynamicFormComponent implements OnChanges {
    @Input() formControls: FormControlBase<any>[] = [];
    form: FormGroup;
    @Output() dynamicFormSubmit = new EventEmitter();
    @Output() dynamicFormClose = new EventEmitter();

    constructor(private fcs: FormControlService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.form = this.fcs.toFormGroup(this.formControls);
    }

    onClose() {
        this.dynamicFormClose.emit();
    }
    
    onSubmit() {
        this.dynamicFormSubmit.emit(this.form.value);
    }
}