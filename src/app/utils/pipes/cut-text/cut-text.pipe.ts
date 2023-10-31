import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText',
})
export class CutTextPipe implements PipeTransform {
  transform(value: string): string {
    const limit = 80;
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
