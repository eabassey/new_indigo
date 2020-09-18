import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ENVIRONMENT } from '../../services/constants';
import { AzureLogin } from '../../store';

@Component({
  selector: 'azure-callback',
  template: `
    <flx-loader-component
      isFullScreen="true"
      [disableBackground]="loaderOptions && !loaderOptions.showBackdrop"
    ></flx-loader-component>
  `
})
export class AzureCallbackComponent implements OnInit {
  loaderOptions = { showBackdrop: true };
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private store: Store<any>,
    private router: Router,
    @Inject(ENVIRONMENT) private environment: any
  ) {}

  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');
    // console.log({ code });
    this.http
      .get(`${this.environment.api_url}${this.environment['azure']['codeForTokenExchangeUrl']}?code=${code}`)
      .subscribe(res => {
        console.log({ res });
        this.store.dispatch(new AzureLogin(res));
        this.router.navigate(['/']);
      });
  }
}
