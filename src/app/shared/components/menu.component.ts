import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  template: `
    <button
      (click)="to()"
      class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-700
       hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
    >
      {{ label }} {{ counter }}
    </button>
  `,
})
export class MenuComponent {
  @Input({ required: true })
  label: string | null = null;

  @Input()
  counter: number | null = null;

  @Output()
  handleClick = new EventEmitter<void>();

  to() {
    this.handleClick.emit();
  }
}
