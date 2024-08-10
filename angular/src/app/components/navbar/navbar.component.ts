import { Component, input, output } from '@angular/core';
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
  public cityChange = output<string>();
  public submit = output<void>();

  protected async onCityChange(city: string) {
    this.cityChange.emit(this.city());
  }

  protected async onSubmit() {
    this.submit.emit();
  }
}
