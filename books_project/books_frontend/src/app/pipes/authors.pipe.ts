import { Pipe, PipeTransform } from '@angular/core';
import { Author } from "../entities/Author";

@Pipe({
    name: 'authors'
})
export class AuthorsPipe implements PipeTransform {
    transform(value: Author[], ...args: unknown[]): unknown {
        return value?.filter(a => !a.deletedAt).map(a => a.name).join(', ');
    }
}
