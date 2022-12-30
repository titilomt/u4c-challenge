type Customer = {
  document: string;
  name: string;
  driverLicense: string;
  birth: Date;
  phone: string;
};

class CustomerService {
  constructor() {}

  async add(customer: Customer): Promise<Customer> {
    return customer;
  }
}

describe("CustomerService", () => {
  it("Deve adicionar um cliente e retornar seus dados", async () => {
    const customerService = new CustomerService();

    const newCustomer = await customerService.add({
      name: "Teste",
      document: "12345656788",
      birth: new Date("1990-01-01"),
      driverLicense: "9922453282",
      phone: "0055031999998888",
    });

    expect(newCustomer).toEqual(
      expect.objectContaining({
        name: "Teste",
      })
    );
  });
});
