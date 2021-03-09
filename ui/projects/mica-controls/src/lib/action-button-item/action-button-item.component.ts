import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mica-action-button-item',
  templateUrl: './action-button-item.component.html',
  styleUrls: ['./action-button-item.component.scss']
})
export class ActionButtonItemComponent implements OnInit {

  @Input() label: string;
  @Input() icon: string;
  @Input() disabled = false;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getUrl(imagePath: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${imagePath})`);
  }
}
