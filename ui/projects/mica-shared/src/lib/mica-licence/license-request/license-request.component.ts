import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LicenseService } from '../license.service';
import { Observable } from 'rxjs';
import { License } from '../model/license.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mica-license-request',
  templateUrl: './license-request.component.html',
  styleUrls: ['./license-request.component.scss']
})
export class LicenseRequestComponent implements OnInit {
  // title$: Observable<string>;
  license$: Observable<License>;
  emailText: string;
  constructor(
    private location: Location,
    private data: LicenseService
  ) { }

  ngOnInit() {
    this.license$ = this.data.getLicense();
  }
  onClose() {
    this.location.back();
  }
  copy(val: License) {
    const emailText = 'Customer information\n---\nCompany:\nCustomer no.:' +
      '\nSalutation:\nFirst name:\nLast name:\nStreet / House no.:\nPostal code / City:\nCountry:\nPhone number:' +
      '\nE-mail address:\n \nRequested product\n---\nProduct: ' + val.product + '\nMICA S/N: ' + val.serial;

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = emailText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
