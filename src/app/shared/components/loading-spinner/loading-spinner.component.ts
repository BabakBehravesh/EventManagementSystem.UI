import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading-spinner',
    template: `
    <div *ngIf="loading" class="text-center">
      <div class="spinner-border" [class]="sizeClass" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `
})
export class LoadingSpinnerComponent {
    @Input() loading = false;
    @Input() size: 'sm' | 'md' | 'lg' = 'md';

    get sizeClass(): string {
        switch (this.size) {
            case 'sm': return 'spinner-border-sm';
            case 'lg': return 'spinner-border-lg';
            default: return '';
        }
    }
}