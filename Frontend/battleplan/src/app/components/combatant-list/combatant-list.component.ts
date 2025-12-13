import { Component, inject } from '@angular/core';
import { CombatantService } from '../../services/combatant.service';
import { CommonModule } from '@angular/common';
import { CombatantRowComponent } from '../combatant-row/combatant-row.component';

@Component({
  selector: 'app-combatant-list',
  standalone: true,
  imports: [CommonModule, CombatantRowComponent],
  template: `
    <div class="combatants">
      @for (combatant of combatants$ | async; track combatant; let i = $index) {
      <app-combatant-row [combatant]="combatant" [index]="i"></app-combatant-row>
      }
    </div>
  `,
  styles: ``,
})
export class CombatantListComponent {
  // Controls the list of combatants and passes down the information plus the index for proper sorting in the child component.
  private combatantService = inject(CombatantService);

  combatants$ = this.combatantService.combatants$;
}
