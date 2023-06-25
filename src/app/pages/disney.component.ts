import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Actions, State } from '../store';

@Component({
  selector: 'app-disney',
  standalone: true,
  imports: [SharedModule],
  template: `
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <li
        class="bg-white rounded-lg shadow-md overflow-hidden"
        *ngFor="let character of store().disney"
      >
        <div class="p-6">
          <h3 class="text-gray-900 text-lg font-semibold">
            {{ character.name }}
          </h3>
          <div class="relative group">
            <img
              [src]="character.imageUrl"
              alt="{{ character.name }}"
              class="w-full h-40 object-cover mt-4 rounded-md transition-all duration-300 cursor-pointer"
              (click)="showConfirmation($event, character.name)"
            />
            <div
              class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            >
              <div id="confirmation" class="text-white text-2xl text-center">
                <p>Am I your favorite character?</p>
                <button (click)="handleYes()">Yes</button>
                <br />
                <button (click)="handleNo()">No</button>
                <p>
                  {{ isFavoriteCharacter ? 'Hooray!' : '' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  `,
})
export class DisneyComponent implements OnInit {
  private _stateService = inject(State);
  private _actionsService = inject(Actions);

  store = this._stateService.store;

  async ngOnInit() {
    await this._actionsService.fetchDisneyCharacters();
  }

  selectedCharacter: string | null = null;
  isFavoriteCharacter = false;

  showConfirmation(event: Event, characterName: string) {
    this.selectedCharacter = characterName;

    // Rest of your code
  }

  handleYes() {
    this.isFavoriteCharacter = true;
  }

  handleNo() {
    this.isFavoriteCharacter = false;
  }
}
