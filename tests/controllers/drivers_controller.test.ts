import request from "supertest"

import app from "../../app"
import DriverModel from "../../models/driver"
import setupDB from "../test.helper"

setupDB()

describe("Drivers controller", () => {
  it("GET to /api/drivers returns a list of nearby drivers", async () => {
    await DriverModel.create([
      {
        email: "user@user.com",
        location: {
          type: "Point",
          coordinates: [-120.2096, 38.2636],
        },
      },
      {
        email: "foo@bar.com",
        location: {
          type: "Point",
          coordinates: [-0.9461, 51.8376],
        },
      },
      {
        email: "test@test.com",
        location: {
          type: "Point",
          coordinates: [-0.0488, 51.4987],
        },
      },
    ])

    const lat = 51.7199,
      lng = -0.6584

    const { body: drivers } = await request(app)
      .get("/api/drivers")
      .query({ lng, lat })

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
      .send({
        email: "foo@bar.com",
        driving: true,
        location: { type: "Point", coordinates: [35.0125, 1.0143] },
      })

    const driver = await DriverModel.findOne({ email: "foo@bar.com" })
    expect(driver?.email).toEqual("foo@bar.com")
  })

  it("GET to /api/drivers/:id returns a specific driver", async () => {
    const foo = await DriverModel.create({
      email: "foo@bar.com",
      location: { type: "Point", coordinates: [35.0125, 1.0143] },
      driving: true,
    })
    const { body: driver } = await request(app).get(`/api/drivers/${foo._id}`)

    expect(driver.email).toEqual(foo.email)
  })

  it("PATCH to /api/drivers/:id updates a driver", async () => {
    const foo = await DriverModel.create({
      email: "foo@bar.com",
      location: { type: "Point", coordinates: [35.0125, 1.0143] },
      driving: true,
    })
    await request(app).patch(`/api/drivers/${foo._id}`).send({ driving: false })

    const driver = await DriverModel.findOne({ email: "foo@bar.com" })
    expect(driver?.driving).toEqual(false)
  })

  it("DELETE to /api/drivers/:id deletes a driver", async () => {
    const foo = await DriverModel.create({
      email: "foo@bar.com",
      location: { type: "Point", coordinates: [35.0125, 1.0143] },
      driving: true,
    })
    await request(app).delete(`/api/drivers/${foo._id}`)

    const driver = await DriverModel.findOne({ email: "foo@bar.com" })
    expect(driver).toBeNull()
  })
})
