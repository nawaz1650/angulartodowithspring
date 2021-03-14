import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './Todo.model';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: Todo[], args: string): Todo[] {
    if (args === '') return value;
    return value.filter((val) => {
      return val.taskString.toLowerCase().indexOf(args.toLowerCase()) !== -1;
    });
  }
}
