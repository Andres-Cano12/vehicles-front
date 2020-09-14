import { environment } from 'environments/environment';

const apiInfo = environment.apiGatewayURL;
const prod = apiInfo.indexOf('aplicativo') !== -1;

var navigationIn = [];

if (prod) {

  const navigationProd = [
    {
      name: 'Home',
      url: '/dashboard',
      icon: 'icon-home',
    }
  ];

  navigationIn = navigationProd;
} else {

  const navigationEx = [
    {
      name: 'Home',
      url: '/dashboard',
      icon: 'icon-home',
    
    },
    {
      name: 'Vehículos',
      url: '/vehicle/list',
      icon: 'fa fa-car',

    },

  ];

  navigationIn = navigationEx;
}

export const navigation = navigationIn;
