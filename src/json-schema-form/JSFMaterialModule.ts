import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatSelectModule, MatCheckboxModule } from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatInputModule, MatSelectModule, MatCheckboxModule],
    exports: [MatButtonModule, MatInputModule, MatSelectModule, MatCheckboxModule],
})
export class JSFMaterialModule { }