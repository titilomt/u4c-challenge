export const CustomerData = [
  {
    id: 11,
    birth: new Date("2010-01-01"),
    document: "77253635051",
    name: "TESTE 11",
    driverLicense: "32890469293",
    phone: "0319911111111",
    vehicules: [
      {
        id: 1,
        name: "Bentley Continental",
        year: "2019",
        plate: "ABC1234",
        brand: "Bentley",
        chassis: "622776020191",
      },
    ],
    incidents: [
      {
        id: 1,
        date: new Date("2022-11-11"),
        address: "RUA TESTE 0",
        customerDocument: "77253635051",
        customerVehiculePlate: "ABC1234",
        policeReport: "ASVC1234567VVVD365",
      },
    ],
  },
  {
    id: 12,
    birth: new Date("2009-01-01"),
    document: "60676154018",
    name: "TESTE 12",
    driverLicense: "21779999670",
    phone: "0319912121212",
    vehicules: [
      {
        id: 2,
        name: "Camaro SS",
        year: "1997",
        plate: "DEF9898",
        brand: "GM",
        chassis: "734835530116",
      },
    ],
  },
];
