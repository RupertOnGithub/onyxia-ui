import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from 'js/components';
import { store } from 'js/redux';
import { getKeycloak } from 'js/utils';
import { setAuthenticated } from 'js/redux/actions';
import { gelLocalToken, setLocalToken } from 'js/utils';
import JavascriptTimeAgo from 'javascript-time-ago';
import fr from 'javascript-time-ago/locale/fr';
import configuration from 'js/configuration';

JavascriptTimeAgo.locale(fr);

const localToken = gelLocalToken();
const keycloakDefaultConf = {
	onLoad: 'check-sso',
	silentCheckSsoRedirectUri: window.location.origin + '/silent-sso.html',
	responseMode: 'query',
	checkLoginIframe: false,
};

const initialiseKeycloak = () =>
	new Promise(resolve => {
		debugger;
		getKeycloak()
			.init(
				localToken
					? { ...keycloakDefaultConf, token: localToken }
					: keycloakDefaultConf
			)
			.success(authenticated => {
				// console.log(authenticated, keycloak.isTokenExpired(localToken));
				if (authenticated) {
					setLocalToken(getKeycloak().token);
					store.dispatch(
						setAuthenticated({
							accessToken: getKeycloak().token,
							refreshToken: getKeycloak().refreshToken,
							idToken: getKeycloak().idToken,
						})
					);
				}
				resolve(authenticated);
			})
			.error(err => {
				// props.authenticationFail(err);
			});

		return false;
	});

console.log(configuration);

if (configuration.AUTHENTICATION.TYPE === 'oidc') {
	initialiseKeycloak().then(() => {
		render(
			<Provider store={store}>
				<App />
			</Provider>,
			document.getElementById('root')
		);
	});
} else {
	setLocalToken('FAKE_TOKEN');
	store.dispatch(
		setAuthenticated({
			accessToken: getKeycloak().token,
			refreshToken: getKeycloak().refreshToken,
			idToken: getKeycloak().idToken,
		})
	);
	render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	);
}