export class Subscriptor {
  constructor(
    public id: string,
    public name: string,
    public subscriberId: string,
    public path: string,
    public enable: boolean,
    public properties: Map<string, string>
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
    return { id: this.id, name: this.name, subscriberId: this.subscriberId, path: this.path, enable: this.enable, properties: properties };
  }
}
