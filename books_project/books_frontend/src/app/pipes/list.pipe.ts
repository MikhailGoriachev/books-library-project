import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'list'
})
export class ListPipe implements PipeTransform {
    transform(value: string[], ...args: unknown[]): unknown {
        return value.join(', ');
    }
}
