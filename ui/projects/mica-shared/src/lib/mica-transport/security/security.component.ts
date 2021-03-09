import { Component, OnInit, ViewChild, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { SecurityFiles } from '../models/security-files.model';

export type CertType = 'trusted' | 'client';
@Component({
  selector: 'mica-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  private readonly fileChosen = 'assets/images/file_new.png';
  private readonly fileExists = 'assets/images/file_check.png';
  private readonly fileMissing = 'assets/images/file_new_grey.png';

  @Input() securityFiles: SecurityFiles;
  @Output() delete = new EventEmitter<CertType>();
  @ViewChild('trusted', { static: true }) trusted: ElementRef<HTMLInputElement>;
  @ViewChild('client', { static: true }) client: ElementRef<HTMLInputElement>;
  constructor() { }

  ngOnInit() {
  }

  handleFileInput(files: FileList, certType: CertType) {
    const file = files.item(0);
    switch (certType) {
      case 'trusted':
        this.securityFiles.trusted = file;
        break;
      case 'client':
        this.securityFiles.client = file;
        break;
      default:
        break;
    }
  }

  uploadFile(certType: CertType) {
    if (certType === 'client') {
      this.client.nativeElement.click();
    } else {
      this.trusted.nativeElement.click();
    }
  }

  deleteFile(certType: CertType) {
    this.delete.emit(certType);
  }

  private getIconPath(chosen: boolean, exists: boolean) {
    if (chosen) {
      return this.fileChosen;
    }
    return exists ? this.fileExists : this.fileMissing;
  }

  get trustedIconPath() {
    return this.getIconPath(this.securityFiles.trusted != null, this.securityFiles.hasTrusted);
  }

  get certIconPath() {
    return this.getIconPath(this.securityFiles.client != null, this.securityFiles.hasKeyStore);
  }
}
