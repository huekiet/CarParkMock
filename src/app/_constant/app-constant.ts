export const AppConstant = {
  COOKIE_KEY_TOKEN: 'accessToken',
  COOKIE_KEY_REFRESH: 'refreshToken',

  COOKIE_KEY_USERINFO: 'user_info',

  API_URL: 'https://localhost:44323',
  ROLES: {
    USER: 'user',
    ADMIN: 'admin',
  },

  ERRORS: {
    LOGIN_FAILURE: "Incorrect username or password",
    UNABLE_TO_RETRIEVE_DATA: "Unable to retrieve data from server",
    UNKNOWN_ERROR: "An error has occured"
  },

  ACTION: {
    UPDATE: "update",
    CREATE: "create",
    DELETE: "delete"
  },

  DEPARTMENT_OPTION: [
    { label: 'Employee', value: 'employee' },
    { label: 'Parking', value: 'parking' },
    { label: 'Admin', value: 'admin' },
  ],

  PARKING_PLACE_OPTION: [
    { label: 'Khu Đông', value: 'Khu Đông' },
    { label: 'Khu Tây', value: 'Khu Tây' },
    { label: 'Khu Nam', value: 'Khu Nam' },
    { label: 'Khu Bắc', value: 'Khu Bắc' },
    { label: 'Trung tâm', value: 'Trung tâm' },
  ],

  PARK_STATUS_OPTION: [
    { label: 'Blank', value: 'Blank' },
    { label: 'Fixing', value: 'Fixing' },
  ],

  CAR_COMPANY: [
    { label: 'Hoàng Long', value: 'Hoàng Long' },
    { label: 'Phương Trang', value: 'Phương Trang' },
    { label: 'Cam Văn', value: 'Cam Văn' },
    { label: 'Sao Mai', value: 'Sao Mai' },
  ],

  OFFICE_PLACE_OPTION: [
    { label: 'Quầy số 1', value: 'Quầy số 1' },
    { label: 'Quầy số 2', value: 'Quầy số 2' },
    { label: 'Quầy số 3', value: 'Quầy số 3' },
    { label: 'Quầy số 4', value: 'Quầy số 4' },
  ]
};
