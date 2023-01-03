export const IncidentsData = [
  {
    id: 1,
    date: new Date("2022-11-11"),
    address: "RUA TESTE 0",
    customerDocument: "77253635051",
    customerVehiculePlate: "ABC1234",
    policeReport: "ASVC1234567VVVD365",
    customers: {
      id: 11,
      birth: new Date("2010-01-01"),
      document: "77253635051",
      name: "TESTE 11",
      driverLicense: "32890469293",
      phone: "0319911111111",
    },
    thirdParty: [
      {
        id: 1,
        name: "TESTE 1",
        document: "42901299008",
        driverLicense: "53453148209",
        phone: "031543333322",
      },
      {
        id: 2,
        name: "Teste 3",
        document: "999999999999",
        driverLicense: "9922453282",
        phone: "0055031999998888",
      },
    ],
  },
];
