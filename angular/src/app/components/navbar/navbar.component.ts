import {Component, output, input, signal, computed} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public city = input.required<string>();
  public citySubmit = output<string>();
  protected cityInputValue = signal<string>('');
  protected showAutocompleteDropDown = signal<boolean>(false);

  protected onCityChange(city: string) {
    if (!this.showAutocompleteDropDown()) {
      this.showAutocompleteDropDown.set(true);
    }
    this.cityInputValue.set(city);

    // SHOW SEARCHING AND HIDE WHEN ON SUBMIT, VALIDATE IF CITY EXISTS
  }

  protected async onSubmit() {
    if (this.city() != this.cityInputValue()) {
      this.showAutocompleteDropDown.set(false);
      this.citySubmit.emit(this.cityInputValue());
    }
  }
}
