export class Subscriber {
  constructor(
    public id?: string,
    public uri?: string,
    public enable?: boolean,
    public properties?: Map<string, string>
  ) {
    if (this.properties instanceof Object) {
      this.properties = new Map<string, string>();
      for (const [pkey, pvalue] of Object.entries(properties)) {
        this.properties.set(pkey, pvalue as string);
      }
    }
  }

  setProperties(value: object) {
    if (!this.properties) {
      this.properties = new Map<string, string>();
    } else {
      this.properties.clear();
    }
    for (const [pkey, pvalue] of Object.entries(value)) {
      this.properties.set(pkey, pvalue as string);
    }
  }

  toObject() {
    const properties = Array.from(this.properties.entries()).reduce((main, [key, val]) => ({...main, [key]: val}), {});
    return { id: this.id, uri: this.uri, properties: properties, enable: this.enable };
  }
}
