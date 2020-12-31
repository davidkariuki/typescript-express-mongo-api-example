import request from "supertest"

import app from "../../app"
import DriverModel from "../../models/driver"
import setupDB from "../test.helper"

setupDB()

describe("Drivers controller", () => {
  it("GET to /api/drivers returns a list of drivers", async () => {
    await DriverModel.create([
      { email: "foo@bar.com" },
      { email: "test@test.com" },
    ])

    const { body: drivers } = await request(app).get("/api/drivers")

    expect(drivers.length).toEqual(2)
    expect(drivers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ email: "foo@bar.com" }),
        expect.objectContaining({ email: "test@test.com" }),
      ])
    )
  })

  it("POST to /api/drivers creates a new driver", async () => {
    await request(app)
      .post("/api/drivers")
      .send({ email: "foo@bar.com", driving: true })

    const driver = await DriverModel.findOne({ email: "foo@bar.com" })
    expect(driver).not.toBeNull()
  })

  it("GET to /api/drivers/:id returns a specific driver", async () => {
    const foo = await DriverModel.create({
      email: "foo@bar.com",
      driving: true,
    })
    const { body: driver } = await request(app).get(`/api/drivers/${foo._id}`)

    expect(driver.email).toEqual(foo.email)
  })

  it("PATCH to /api/drivers/:id updates a driver", async () => {
    const foo = await DriverModel.create({
      email: "foo@bar.com",
      driving: true,
    })
    await request(app).patch(`/api/drivers/${foo._id}`).send({ driving: false })

    const driver = await DriverModel.findOne({ email: "foo@bar.com" })
    expect(driver?.driving).toEqual(false)
  })

  it("DELETE to /api/drivers/:id deletes a driver", async () => {
    const foo = await DriverModel.create({
      email: "foo@bar.com",
      driving: true,
    })
    await request(app).delete(`/api/drivers/${foo._id}`)

    const driver = await DriverModel.findOne({ email: "foo@bar.com" })
    expect(driver).toBeNull()
  })
})
