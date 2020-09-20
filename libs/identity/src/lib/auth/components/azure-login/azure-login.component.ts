import { Component, Inject, Input } from '@angular/core';
import { ENVIRONMENT } from '../../../services/constants';

@Component({
  selector: 'azure-login',
  templateUrl: 'azure-login.component.html',
  styleUrls: ['azure-login.component.scss']
})
export class AzureLoginComponent {
  @Input() disabled: boolean;
  @Input() azureLoginUrl: string;
  isSubmittingWithAzure: boolean;
  disableBackground: boolean;

  constructor(@Inject(ENVIRONMENT) private environment: any) {}

  loginWithAzure() {
    this.isSubmittingWithAzure = true;
    location.href = `${this.environment.api_url}${this.environment['azure']['loginUrl']}`;
  }
}
