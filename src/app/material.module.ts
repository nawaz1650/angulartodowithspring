import { NgModule } from "@angular/core";
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    imports:[MatDialogModule, MatFormFieldModule,MatProgressSpinnerModule,
        MatInputModule,] ,
    exports:[MatDialogModule, MatFormFieldModule,MatProgressSpinnerModule,
        MatInputModule,]
})
export class MatModules{}