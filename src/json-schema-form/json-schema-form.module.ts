import { CommonModule }                     from '@angular/common';
import { NgModule, ModuleWithProviders }    from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JSFMaterialModule }                from './JSFMaterialModule';

import { JsonSchemaFormComponent }      from './json-schema-form.component';
import { DynamicFormComponent }         from './dynamic-form/dynamic-form.component';
import { DynamicFormControlComponent }  from './dynamic-form-control/dynamic-form-control.component';
import { JsonSchemaFormService }        from './json-schema-form.service';
import { FormControlService }           from './form-controls/form-control.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        JSFMaterialModule
    ],
    declarations: [
        JsonSchemaFormComponent,
        DynamicFormComponent,
        DynamicFormControlComponent
    ],
    exports: [JsonSchemaFormComponent],
    providers: [
        JsonSchemaFormService,
        FormControlService
    ]
})
export class JsonSchemaFormModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: JsonSchemaFormModule,
            providers: [
                JsonSchemaFormService,
                FormControlService
            ]
        };
    }
}