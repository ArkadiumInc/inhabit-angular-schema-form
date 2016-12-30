import { Injectable } from '@angular/core';

import { FormControlSelect } from './form-controls/form-control-select';
import { FormControlText } from './form-controls/form-control-text';

const SchemaPropertiesTypes = {
    String: 'string',
};

const FormControlTypes = {
    Select: 'select',
    TextBox: 'text'
};

@Injectable()
export class JsonSchemaFormService {

    constructor() {
    }

    transformSchemaToForm(schema: any, form: any) {
        // Iterate through schema properties
        const keys = Object.keys(schema.properties);
        return keys.map(key => {
            const property = schema.properties[key];
            property.required = schema.required && schema.required.indexOf(key);
            // Create object for future control
            let controlData = {
                key: key,
                schema: property,
                formExtra: form.find((formProp: any) => formProp.key === key) || {}
            };
            return this.transformToFormControl(controlData);
        });
    }

    fillControlWithValues(formControls: any, model: any) {
        // Fill controls with values
        if (model) {
            formControls.forEach((formControl: any, index: any, resultControls: any) => {
                let modelKeys = Object.keys(model);
                if (modelKeys.indexOf(formControl.key) != -1) {
                    resultControls[index].value = model[formControl.key] || '';
                } else {
                    resultControls[index].value = '';
                }
            });
        }
    }

    private transformToFormControl(controlData: any) {
        let controlType = this.selectTypeOfControl(controlData.schema);
        let formControl: any;

        switch (controlType) {
            case(FormControlTypes.Select):
            {
                formControl = this.transformToSelectType(controlData);
                break;
            }
            case(FormControlTypes.TextBox):
            {
                formControl = this.transformToTextType(controlData);
                break;
            }
        }
        return formControl;
    }

    private selectTypeOfControl(schema: any) {
        if (schema.type === SchemaPropertiesTypes.String) {
            if (schema.enum) {
                return 'select';
            } else {
                return 'text';
            }
        }
        throw new Error("Cannot handle property of schema with type " + schema.type);
    }

    // TODO Allow to set value (selected option)
    private transformToSelectType(controlData: any) {
        let formObject: any = this.createStandardFormObject(controlData);

        formObject.options = controlData.schema.enum.map((enumValue: any) => {
            return {key: enumValue, value: enumValue};
        });
        return new FormControlSelect(formObject);
    }

    // TODO Allow to set value
    private transformToTextType(controlData: any) {
        let formObject = this.createStandardFormObject(controlData);
        return new FormControlText(formObject);
    }

    private createStandardFormObject(controlData: any) {
        return {
            type: controlData.schema.type,
            key: controlData.key,
            title: controlData.formExtra.title || controlData.schema.title || controlData.key,
            required: controlData.schema.required
        };
    }

}
