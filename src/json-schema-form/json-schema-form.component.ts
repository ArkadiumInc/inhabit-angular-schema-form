import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';

import { JsonSchemaFormService } from './json-schema-form.service';

@Component({
    selector: 'json-schema-form',
    templateUrl: 'json-schema-form.component.html',
    styleUrls: ['json-schema-form.component.less']
})
export class JsonSchemaFormComponent implements OnChanges {
    @Input() schema: any;
    @Input() form: any;
    @Input('model') sourceModel: any;
    @Output('on-form-submit') onFormSubmit: EventEmitter<any> = new EventEmitter();
    @Output('on-form-close') onFormClose: EventEmitter<any> = new EventEmitter();
    resultControls: any;

    constructor(private jsfService: JsonSchemaFormService) {
    }

    /**
     * Change source model object, and emit event with it
     * @param value
     */
    jsonSchemaFormSubmitted(value: any) {
        Object.assign(this.sourceModel, value);
        this.onFormSubmit.emit(this.sourceModel);
    };

    jsonSchemaFormClosed() {
        this.onFormClose.emit();
    };

    ngOnChanges(changes: SimpleChanges) {
        this.processInputData();
    }

    private processInputData() {
        this.resultControls = this.jsfService.transformSchemaToForm(this.schema, this.form);
        this.jsfService.fillControlWithValues(this.resultControls, this.sourceModel);
    }
}
