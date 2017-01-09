import { Injectable } from '@angular/core';

import { FormControlSelect } from './form-controls/form-control-select';
import { FormControlText } from './form-controls/form-control-text';

const SchemaPropertiesTypes = {
    String: 'string',
    Object: 'object'
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
        schema = this.flattenSchema(schema);
        // Iterate through schema properties
        const keys = Object.keys(schema.properties);
        let formControls: Array<any> = [];
        keys.forEach(key => {
            const property = schema.properties[key];
            property.required = schema.required && schema.required.indexOf(key);
            // Create object for future control
            let controlData = {
                key: key,
                schema: property,
                formExtra: form.find((formProp: any) => formProp.key === key) || {}
            };
            let controls = this.transformToFormControl(controlData);
            formControls.push(controls);
        });
        return formControls;
    }

    private flattenSchema(schema: any) {
        const keys = Object.keys(schema.properties);
        keys.forEach(key => {
            const property = schema.properties[key];
            if (property.type !== SchemaPropertiesTypes.Object) {
                return;
            }
            // Flatten all nested properties
            let childKeys = Object.keys(property.properties);
            childKeys.map(childKey => {
                schema.properties[key + '.' + childKey] = property.properties[childKey];
            });
            // Delete source property
            delete schema.properties[key];
        });
        return schema;
    }

    fillControlWithValues(formControls: any, model: any) {
        // Fill controls with values
        if (model) {
            formControls.forEach((formControl: any, index: any, resultControls: any) => {
                resultControls[index].value = this.getPropertyByPath(model, formControl.key) || '';
            });
        }
    }

    private getPropertyByPath(obj: any, string: string): any {
        var parts = string.split('.');
        var newObj = obj[parts[0]];
        if (newObj && parts[1]) {
            parts.splice(0, 1);
            var newString = parts.join('.');
            return this.getPropertyByPath(newObj, newString);
        }
        return newObj;
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
