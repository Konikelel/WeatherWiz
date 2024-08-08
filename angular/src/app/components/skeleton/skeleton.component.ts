import {AfterViewInit, Component, ElementRef, input, OnInit, viewChild, ViewChild} from '@angular/core';
import {StyleEnum} from "../../enums/style.enum";

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [],
  template: '<span #skeletonItem></span>',
  styleUrl: './skeleton.component.scss'
})
export class SkeletonComponent implements AfterViewInit {
  public style = input.required<StyleEnum>()
  private skeletonItem = viewChild.required<ElementRef<HTMLDivElement>>('skeletonItem');

  ngAfterViewInit() {
    switch (this.style()) {
      case StyleEnum.TextMedium:
        this.skeletonItem().nativeElement.style.width = '80%'
        break;
      case StyleEnum.TextSmall:
        this.skeletonItem().nativeElement.style.width = '60%'
        break;
      default:
        this.skeletonItem().nativeElement.style.width = '100%'
        break;
    }

    this.skeletonItem().nativeElement.style.height = this.style() === StyleEnum.Image ? '100%' : "1em";
  }
}
