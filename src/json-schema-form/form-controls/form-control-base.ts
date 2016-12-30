export class FormControlBase<T> {
    value: T;
    key: string;
    title: string;
    required: boolean;
    order: number;
    controlType: string;

    constructor(options: {
        value?: T,
        key?: string,
        title?: string,
        required?: boolean,
        order?: number,
        controlType?: string
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.title = options.title || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
}