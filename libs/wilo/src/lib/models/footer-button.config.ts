import { CoreServices } from '../services';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

export interface FooterButtonConfig {
    isPreviousButton?: boolean;
    text: string;
    routerLink?: any[];
    linkType?: 'portal' | 'submit';
    portalData?: {
      type: 'actionPanel' | 'modal';
      paramFunc: (svc: CoreServices, route?: ActivatedRoute) => void;
    };
    onClick?: (svc?: CoreServices, compInstances?: any[], route?: ActivatedRoute, ev?: MouseEvent) => void;
    serverFirst?: boolean;
    optIntoValidation?: boolean;
    location?: 'left' | 'center' | 'right';
    color?: string;
    // serverCalls?: ServerCall[];
    // serverQueries?: ServerQuery[];
    visible?: (svc: CoreServices, route?: ActivatedRoute) => Observable<boolean>;
    disable?: (svc: CoreServices, route?: ActivatedRoute) => Observable<boolean>;
  }
