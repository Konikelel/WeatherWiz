import {AfterViewInit, Component, ElementRef, input, OnInit, viewChild, ViewChild} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [
    NgStyle
  ],
  template: '<span #skeletonItem></span>',
  styleUrl: './skeleton.component.scss'
})
export class SkeletonComponent implements AfterViewInit {
  public style = input.required<{width: string, height: string}>()
  private skeletonItem = viewChild.required<ElementRef<HTMLDivElement>>('skeletonItem');

  ngAfterViewInit() {
    this.skeletonItem().nativeElement.style.width = this.style().width;
    this.skeletonItem().nativeElement.style.height = this.style().height;
  }
}
