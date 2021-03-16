import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ValueType } from '@menucha-de/controls';

@Component({
  selector: 'mica-transport-properties',
  templateUrl: './transport-properties.component.html',
  styleUrls: ['./transport-properties.component.scss']
})
export class TransportPropertiesComponent implements OnInit {

  @Input() properties: Map<string, string>;
  propertiesForm: FormGroup;
  propsArray: FormArray;
  defaultProperties = new Map<string, ValueType>([
    ['Transporter.ResendRepeatPeriod', 'number'],
    ['Transporter.ResendQeueSize', 'number'],
    ['Transporter.Azure.OnDemand', 'boolean']
  ]);
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createPropertiesForm();
    this.propsArray = this.propertiesForm.get('properties') as FormArray;
    this.fillProperties();
    // Add empty property that can be filled
    this.propsArray.push(this.createProperty());
  }

  getValueType(prop: string): ValueType {
    const value = this.defaultProperties.get(prop);
    if (!value) {
      return 'string';
    }
    return value;
  }

  saveProperties() {
    this.properties.clear();
    for (const prop of this.propsArray.controls) {
      const key = prop.get('key').value as string;
      const value = prop.get('value').value;
      let stringVal = '';
      if (value != null) {
        stringVal = value.toString();
      }
      if (key.length > 0 && stringVal.length > 0) {
        this.properties.set(key, stringVal);
      }
    }
  }

  private fillProperties() {
    if (this.properties) {
      for (const [key, value] of this.properties.entries()) {
        this.propsArray.push(this.createProperty(key, value));
      }
    }
  }

  private createPropertiesForm() {
    this.propertiesForm = this.fb.group({
      properties: this.fb.array([])
    });
  }

  createProperty(key = '', value = ''): FormGroup {
    const group = this.fb.group({
      key: [key],
      value: [value]
    });
    group.valueChanges.subscribe(() => {
      this.addLine();
    });
    return group;
  }

  addLine() {
    const lastVal = this.propsArray.at(this.propsArray.length - 1);
    const key = lastVal.get('key').value as string;
    const value = lastVal.get('value').value as string;
    if (key.length > 0 || value.length > 0) {
      this.propsArray.push(this.createProperty());
    }
  }
}
