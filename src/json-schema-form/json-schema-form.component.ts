import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';

import { JsonSchemaFormService } from './json-schema-form.service';

@Component({
    selector: 'json-schema-form',
    templateUrl: './json-schema-form.component.html'
})
export class JsonSchemaFormComponent implements OnChanges {
    @Input() schema: any;
    @Input() form: any;
    @Input('model') sourceModel: any;
    @Output('on-form-submit') onFormSubmit: EventEmitter<any> = new EventEmitter();
    @Output('on-form-close') onFormClose: EventEmitter<any> = new EventEmitter();
    resultControls: any;

    constructor(private jsfService: JsonSchemaFormService) {}

    /**
     * Change source model object, and emit event with it
     * @param formValue
     */
    jsonSchemaFormSubmitted(formValue: any) {
        this.jsfService.assignFormValueToSourceModel(this.sourceModel, formValue);
        this.onFormSubmit.emit(this.sourceModel);
    };

    jsonSchemaFormClosed() {
        this.onFormClose.emit();
    };

    ngOnChanges(changes: SimpleChanges) {
        try {
            this.processInputData();
        } catch(e) {
            console.error(e);
        }
    }

    private processInputData() {
        this.resultControls = this.jsfService.transformSchemaToForm(this.schema, this.form);
        this.jsfService.fillControlWithValues(this.resultControls, this.sourceModel);
    }
}
