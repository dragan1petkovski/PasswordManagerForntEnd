import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { JwtService } from '../../../Services/HTTPClient/jwt.service'
import { ConnectionService } from "../../../Services/HTTPClient/connection.service"
import { OAuthService } from "angular-oauth2-oidc"
import { OidcFlowConfig } from "../../../Services/oidc.config"
import { adfs_roles } from '../../../StaticObjects/AdfsRoles'
import { AdfsAccessToken } from "../../../DTO/Adfs/AccessToken"

@Component({
    selector: "app-auth",
    templateUrl: "AdfsCode.component.html",
    imports: [],
    providers: [OAuthService]
})
export class AdfsCodeComponent {
    constructor(private route: ActivatedRoute, private router: Router, private oidc: OAuthService, private jwtService: JwtService, private conservice: ConnectionService) {
    }

    async ngOnInit()
    {
        let code;
        let state;
        this.route.queryParams.subscribe(t => {
            code = `&code=${t['code']}`
            state = `&state=${t['state']}`
        })

		let grant_type= "&grant_type=authorization_code"
		let client_id = `client_id=${OidcFlowConfig.clientId}`
		let redirect_uri = `&redirect_uri=${OidcFlowConfig.redirectUri}`
		let code_verifier = `&code_verifier=${sessionStorage.getItem("PKCE_verifier")}`
		let body = `${client_id}${code}${redirect_uri}${state}${grant_type}${code_verifier}`

		this.conservice.gPOST<AdfsAccessToken>(OidcFlowConfig.tokenEndpoint!,body).subscribe(res => {
			sessionStorage.setItem("id_token",res.id_token)
        	sessionStorage.setItem("jwt", res.access_token)
			let role = this.jwtService.GetRole(res.access_token)
			if(role == adfs_roles.adminrole)
			{
				this.router.navigate(["admin"])
			}
			else if(role == adfs_roles.userrole)
			{
				this.router.navigate(['home'])
			}
		})



    }
}
