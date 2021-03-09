import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mica-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

  @Input() title: string;
  @Input() disabled: boolean;
  @Input() icon: string;
  constructor() { }

  ngOnInit() {
  }

  get iconUrl() {
    return 'url("assets/images/' + this.icon + '")';
  }
}
