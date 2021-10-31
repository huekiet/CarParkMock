export const MENU = [
  {
    title: 'Employee Manager',
    icon: 'pi pi-user mr-1',
    collapse: true,
    subMenu: [
      {
        title: 'Employee list',
        icon: 'pi pi-plus mr-1',
        route: '/user/employee/list',
      },
      {
        title: 'Add employee',
        icon: 'pi pi-list mr-1',
        route: '/user/employee/create',
      },
    ],
  },
  {
    title: 'Car manager',
    icon: 'fas fa-car mr-1',
    collapse: true,
    subMenu: [
      {
        title: 'Car list',
        icon: 'pi pi-plus mr-1',
        route: '/user/car/list',
      },
      {
        title: 'Add Car',
        icon: 'pi pi-list mr-1',
        route: '/user/car/create',
      },
    ],
  },
  {
    title: 'Parking lot manager',
    icon: 'pi pi-directions mr-1',
    collapse: true,
    subMenu: [
      {
        title: 'Parking lot list',
        icon: 'pi pi-plus mr-1',
        route: '/user/parkinglot/list',
      },
      {
        title: 'Add Parking lot',
        icon: 'pi pi-list mr-1',
        route: '/user/parkinglot/create',
      },
    ],
  },
  {
    title: 'Ticket manager',
    icon: 'pi pi-ticket mr-1',
    collapse: true,
    subMenu: [
      {
        title: 'Ticket list',
        icon: 'pi pi-plus mr-1',
        route: '/user/ticket/list',
      },
      {
        title: 'Add Ticket',
        icon: 'pi pi-list mr-1',
        route: '/user/ticket/create',
      },
    ],
  },
  {
    title: 'Trip manager',
    icon: 'pi pi-map mr-1',
    collapse: true,
    subMenu: [
      {
        title: 'Trip list',
        icon: 'pi pi-plus mr-1',
        route: '/user/trip/list',
      },
      {
        title: 'Add trip',
        icon: 'pi pi-list mr-1',
        route: '/user/trip/create',
      },
    ],
  },
  {
    title: 'Booking office manager',
    icon: 'pi pi-home mr-1',
    collapse: true,
    subMenu: [
      {
        title: 'Booking office  list',
        icon: 'pi pi-plus mr-1',
        route: '/user/booking-office/list',
      },
      {
        title: 'Add Booking office',
        icon: 'pi pi-list mr-1',
        route: '/user/booking-office/create',
      },
    ],
  },
];
