import Keycloak from 'keycloak-js'

interface KeycloakConfig {
  url: string
  realm: string
  clientId: string
}

const config: KeycloakConfig = {
  url: 'https://dawit.sytes.net/auth',
  realm: 'myhome',
  clientId: 'myhome-web'
}

export const keycloak = new Keycloak(config)

export const initKeycloak = async (): Promise<boolean> => {
  try {
    const authenticated = await keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256',
      checkLoginIframe: false
    })
    

    keycloak.onTokenExpired = async () => {
      try {
        await keycloak.updateToken(30)
      } catch (error) {
        console.error('Failed to refresh token', error)
        keycloak.login()
      }
    }
    
    return authenticated
  } catch (error) {
    console.error('Keycloak init failed', error)
    return false
  }
}
