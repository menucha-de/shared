import { InjectionToken } from '@angular/core';

export const TransportConfigService = new InjectionToken<TransportConfig>('TransportConfig');

export interface TransportConfig {
  subscribers: {
    restBaseUrl: string;
    routeParentUrl: string;
  };
  subscriptions: {
    restBaseUrl: string;
    routeParentUrl: string;
  };
}
