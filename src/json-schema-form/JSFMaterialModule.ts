import { NgModule } from '@angular/core';
import { MdButtonModule, MdInputModule, MdSelectModule, MdCheckboxModule } from '@angular/material';

@NgModule({
    imports: [MdButtonModule, MdInputModule, MdSelectModule, MdCheckboxModule],
    exports: [MdButtonModule, MdInputModule, MdSelectModule, MdCheckboxModule],
})
export class JSFMaterialModule { }