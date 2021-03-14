import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[deletedirective]'
})
export class DeleteDirective{
    constructor(){}
    @HostBinding('style.backgroundColor') bgcolor;
    @HostBinding('style.color') color='red';
    @HostListener('mouseover') highlightspan(){
        this.bgcolor='red';
        this.color='White';
        
    }
    @HostListener('mouseleave') dehighlightspan(){
        this.bgcolor='';
        this.color='red';
        
    }
}