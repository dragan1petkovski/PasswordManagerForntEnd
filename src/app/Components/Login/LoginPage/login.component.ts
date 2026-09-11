import { Component } from '@angular/core';
import { OidcFlowConfig } from "../../../Services/oidc.config"
import { OAuthService } from "angular-oauth2-oidc"

@Component({
	selector: "app-root",
    templateUrl: 'login.component.html',
	standalone: true
  })
export class LoginComponent {

	constructor(private oauthService: OAuthService)
	{
		this.oauthService.configure(OidcFlowConfig)
		this.oauthService.loadDiscoveryDocument();
		this.oauthService.clearHashAfterLogin = true

	}

	Login():void {
		this.oauthService.initLoginFlow()
	}
}