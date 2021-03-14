import { NgModule } from "@angular/core";
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports:[MatDialogModule, MatFormFieldModule,
        MatInputModule,] ,
    exports:[MatDialogModule, MatFormFieldModule,
        MatInputModule,]
})
export class MatModules{}