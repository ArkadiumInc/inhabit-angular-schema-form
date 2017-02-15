import { NgModule, ModuleWithProviders }    from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule }                   from '@angular/material';

import { JsonSchemaFormComponent }     from './json-schema-form.component';
import { DynamicFormComponent }        from './dynamic-form/dynamic-form.component';
import { DynamicFormControlComponent } from './dynamic-form-control/dynamic-form-control.component';
import { JsonSchemaFormService }       from './json-schema-form.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
        JsonSchemaFormComponent, DynamicFormComponent, DynamicFormControlComponent
    ],
    exports: [JsonSchemaFormComponent],
    providers: [JsonSchemaFormService]
})
export class JsonSchemaFormModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: JsonSchemaFormModule };
    }
}