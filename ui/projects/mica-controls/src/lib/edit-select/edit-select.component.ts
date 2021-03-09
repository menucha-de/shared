import {
  Component, Input, Output, EventEmitter, ViewChild, ElementRef, SimpleChanges,
  AfterViewInit, OnChanges, OnDestroy, Renderer2
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ValueType } from './value-type.model';


@Component({
  selector: 'mica-edit-select',
  templateUrl: './edit-select.component.html',
  styleUrls: ['./edit-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: EditSelectComponent,
    multi: true
  }]
})
export class EditSelectComponent implements ControlValueAccessor, AfterViewInit, OnChanges, OnDestroy {

  public ifContainerFocused: boolean;
  public containerFocusedStyles: object;
  public currentOption: string;
  public current: string;
  public currentData: Map<string, ValueType>;
  public mutationObserverDOM: MutationObserver;
  public shown = false;
  onChange: any;
  @Input() data: Map<string, ValueType>;
  @Input() isDisabled: boolean;
  @Input() isGrouped = true;
  @Input() value: string;
  @Input() placeholder: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();


  @ViewChild('dropdownMenu') private dropdownMenu: ElementRef;
  @ViewChild('dropdownButton') private dropdownButton: ElementRef;
  @ViewChild('dropdownInput') private dropdownInput: ElementRef;


  constructor(private renderer: Renderer2) {
    this.ifContainerFocused = false;
  }
  writeValue(value: string): void {
    this.currentOption = value;
    this.current = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(this.dropdownInput.nativeElement, 'disabled', isDisabled);
    this.renderer.setProperty(this.dropdownButton.nativeElement, 'disabled', isDisabled);
  }

  ngAfterViewInit() {
    this.mutationObserverDOM = new MutationObserver(() => {
      this.setContainerDimensions();
    });

    this.mutationObserverDOM.observe(this.dropdownMenu.nativeElement, {
      childList: true
    });
  }

  ngOnChanges(simpleChanges: SimpleChanges) {

    if (simpleChanges.hasOwnProperty('data')) {
      this.currentData = this.data;

    }
    if (this.data && !this.value) {
      this.setDefaultOption();
    } else if (this.data && this.value) {
      this.currentOption = this.value;
    }
    if (!this.currentOption) { this.setDefaultOption(); }
  }

  setDefaultOption() {
    this.currentOption = '';
  }

  setContainerDimensions() {
    let defaultDropdownHeight = this.dropdownMenu.nativeElement.children[0].offsetHeight;
    const actualList = this.dropdownMenu.nativeElement.children[0].children;
    defaultDropdownHeight += Array.from(actualList).reduce((accumulator, currentValue) => accumulator + currentValue['offsetHeight'], 0);
    const dropdownButtonElement = this.dropdownButton.nativeElement;
    const dropdownButtonRect = dropdownButtonElement.getBoundingClientRect();


    const distanceFromTop = dropdownButtonRect.top + dropdownButtonElement.offsetHeight;
    const distanceFromLeft = dropdownButtonRect.left;
    const distanceFromBottom = window.innerHeight - distanceFromTop + dropdownButtonElement.offsetHeight;

    // If the space below is more than the dropdown height
    if (distanceFromBottom > defaultDropdownHeight) {
      // Un-reversify the list of array
      this.containerFocusedStyles = {
        top: distanceFromTop + 'px',
        left: distanceFromLeft + 'px',
        width: dropdownButtonElement.offsetWidth + 'px',
        'flex-direction': 'column'
      };
    } else if (distanceFromTop > defaultDropdownHeight) {
      // If the space above is more than the dropdown height
      // Reversify the list of array
      this.containerFocusedStyles = {
        bottom: distanceFromBottom + 'px',
        left: distanceFromLeft + 'px',
        width: dropdownButtonElement.offsetWidth + 'px',
        'flex-direction': 'column-reverse'
      };

    } else {
      // If space above and below both are less, show where it is maximum
      // When space below is more
      if (distanceFromBottom > distanceFromTop) {
        this.containerFocusedStyles = {
          top: distanceFromTop + 'px',
          bottom: '20px',
          left: distanceFromLeft + 'px',
          width: dropdownButtonElement.offsetWidth + 'px',
          'flex-direction': 'column'
        };
      } else {
        // When space above is more
        this.containerFocusedStyles = {
          top: '20px',
          bottom: distanceFromBottom + 'px',
          left: distanceFromLeft + 'px',
          width: dropdownButtonElement.offsetWidth + 'px',
          'flex-direction': 'column-reverse'
        };

      }
    }
  }

  onInputChange(event: KeyboardEvent) {
    this.currentOption = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.currentOption);
    this.onChange(this.currentOption);
  }

  onDropdownItemSelect(event: MouseEvent, option: string) {
    this.currentOption = option;
    this.current = option;
    this.valueChange.emit(option);
    this.onChange(option);
    this.hideDropdown();
    this.shown = false;
  }

  onDropdownMenuClick(event: MouseEvent) {
    if (event.target instanceof HTMLInputElement) {
      return;
    } else {
      if (this.shown) {
        this.shown = false;
        this.hideDropdown();
      } else {
        this.setContainerDimensions();
        this.showDropdown();
        this.shown = true;
      }
    }
  }
  onDropdownBlur(event: FocusEvent) {
    this.ifContainerFocused = false;
    this.hideDropdown();
  }

  showDropdown() {
    this.dropdownMenu.nativeElement.focus();
  }

  hideDropdown() {
    this.dropdownMenu.nativeElement.blur();

  }
  onClickedOutside() {
    this.shown = false;
  }
  ngOnDestroy() {
    this.mutationObserverDOM.disconnect();
  }
}
