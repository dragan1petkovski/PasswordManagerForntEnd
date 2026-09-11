import { AuthConfig } from "angular-oauth2-oidc"

export const OidcFlowConfig: AuthConfig = {
    issuer: "https://adfs.test.local/adfs",
    redirectUri: "https://cm.test.local/adfs/code",
    clientId: "d2f2b791-a694-4d42-b462-15aed1bd9f81",
    scope: "openid",
    responseType: "code",
	clearHashAfterLogin: true,
	logoutUrl: "https://adfs.test.local/adfs/oauth2/logout",
    postLogoutRedirectUri: "https://cm.test.local",
	tokenEndpoint: "https://adfs.test.local/adfs/oauth2/token/",

}

