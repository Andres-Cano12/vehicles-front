export const 

APIENDPOINT = {


 //#region 
 
  createVehicle: 'api/vehicle/CreateVehicle',

  uploadFile: 'api/vehicle/UploadFile',

  getAll: 'api/vehicle/getall',

  //#endregion
  
  LOGIN: 'api/User/Login',
  REGISTER: 'api/User/CreateAsync',
  //#region Auth

  getToken: '/token',
  home: '/dashboard',
  refreshToken: '/token/refresh',

  //#endregion 
   //#region Claim

  getAllClaim: 'api/claim/getAll',
  deleteClaim: 'api/claim/delete',
  getClaimMasterFilter: 'api/claim/getMasterFilter',
  createClaim: 'api/claim/create/',
  editClaim: 'api/claim/edit',
  getMasterClaim: 'api/claim/getMasterLists',
  detailClaim: 'api/claim/details/',
  uploadClaimFiles: 'api/claim/uploadMultipleFiles',

  //#endregion
}

export const MESSAGES = {
  successMessage: "El elemento ha sido creado",
  successFileMessage: "El archivo ha sido descargado",
  errorMessage: "Error",
  validationMessage: "Número de documento es requerido",
  EmptyFile: "Archivó sin conténido",
}

export const FILENAME = {
  dowloadFileName: ".txt"
}

export const WEB_STORAGE_KEYS = {
  ACCESS_TOKEN : "atk",
  USER : "usr",
  USEREMAIL : "eml",
  USERNAME : "name",
}; 

export const AUTH_URLS = {
  LOGIN_URL: '/pages/login',
  REGISTER_URL : '/pages/register',
  HOME_URL: '/dashboard',
};

export const VALIDATORS_PATTERN = {
  EMAIL : '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'
}
