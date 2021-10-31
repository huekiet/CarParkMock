import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MENU } from 'src/app/_constant/menu';

@Component({
  selector: 'side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SideNavBarComponent implements OnInit {
  menu = MENU;
  constructor() {}

  ngOnInit(): void {}
  toggleCollapse(title: string) {
    let menuItem = this.menu.find((item) => item.title === title);
    menuItem.collapse = !menuItem.collapse;
  }
}
