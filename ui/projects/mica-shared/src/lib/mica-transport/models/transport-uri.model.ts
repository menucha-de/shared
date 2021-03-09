import * as URL from 'url-parse';

export interface Uri {
  protocol: string;
  host: string;
  port: string;
  path: string;
  query: string;
  fragment: string;
  username: string;
  password: string;
  topic: string;
  clientid: string;
  qos: string;
}

export class TransportUri {

  static readonly noParsing = ['azure', 'jdbc'];
  static readonly parsing = ['http', 'https', 'mqtt', 'mqtts', 'tcp', 'udp'];
  private url: URL;
  private mqtt: boolean;
  private extracted: {
    slashes: boolean;
    protocol: string;
    rest: string;
  };

  static getType(uri: string) {
    const type = URL.extractProtocol(uri).protocol.slice(0, -1);
    if ([...this.parsing, ...this.noParsing].includes(type)) {
      return type;
    }
    return 'custom';
  }

  static getRest(uri: string) {
    return URL.extractProtocol(uri).rest;
  }

  fromString(source: string) {
    this.extracted = URL.extractProtocol(source);
    this.mqtt = this.extracted.protocol.startsWith('mqtt');
    this.url = new URL(source, this.mqtt);
  }

  fromUri(source: Uri) {
    const tempSource = source.protocol + '://' + source.host;
    this.extracted = URL.extractProtocol(tempSource);
    this.mqtt = source.protocol.startsWith('mqtt');
    this.url = new URL(tempSource, this.mqtt);
    Object.assign(this, source);
    if (this.mqtt && source.topic.startsWith('/')) {
      this.topic = '//' + this.topic;
    } else if (this.mqtt && source.topic.length === 0) {
      this.topic = '/';
    }
}

  parsedUri(): Uri {
    return {
      protocol: this.protocol,
      host: this.host,
      port: this.port,
      path: this.path,
      query: this.query,
      fragment: this.fragment,
      username: this.username,
      password: this.password,
      topic: this.topic,
      clientid: this.clientid,
      qos: this.qos
    };
  }

  public get host() {
    return this.url.hostname;
  }
  public set host(value: string) {
    this.url.set('hostname', value);
  }

  public get port() {
    return this.url.port;
  }
  public set port(value: string) {
    this.url.set('port', value);
  }

  public get protocol() {
    return this.extracted.protocol.slice(0, -1);
  }
  public set protocol(value: string) {
    this.url.set('protocol', value);
  }

  public get path() {
    return this.url.pathname.slice(1);
  }
  public set path(value: string) {
    if (!this.mqtt) {
      this.url.set('pathname', value);
    }
  }

  public get query() {
    if (this.url.query instanceof Object) {
      return URL.qs.stringify(this.url.query);
    }
    return (this.url.query as string).slice(1);
  }
  public set query(value: string) {
    if (!this.mqtt) {
      this.url.set('query', value);
    }
  }

  public get fragment() {
    return this.url.hash.slice(1);
  }
  public set fragment(value: string) {
    this.url.set('hash', value);
  }

  public get username() {
    return this.url.username;
  }
  public set username(value: string) {
    this.url.set('username', value);
  }

  public get password() {
    return this.url.password;
  }
  public set password(value: string) {
    this.url.set('password', value);
  }

  public get topic() {
    return this.url.pathname.slice(1);
  }
  public set topic(value: string) {
    if (this.mqtt) {
      this.url.set('pathname', value);
    }
  }

  public get clientid() {
    if (this.mqtt) {
      return this.url.query.clientid;
    } else {
      return '';
    }
  }
  public set clientid(value: string) {
    if (this.mqtt) {
      const qry = this.url.query;
      if (value != null && value.length > 0) {
        qry['clientid'] = value;
      }
      this.url.set('query', qry);
    }
  }

  public get qos() {
    if (this.mqtt) {
      return this.url.query.qos;
    } else {
      return '';
    }
  }
  public set qos(value: string) {
    if (this.mqtt) {
      const qry = this.url.query;
      if (value != null && value.length > 0) {
        qry['qos'] = value;
      }
      this.url.set('query', qry);
    }
  }

  toString(): string {
    return this.url.toString();
  }
}
