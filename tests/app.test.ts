import request from "supertest"
import app from "../app"

describe("The express app", () => {
  it("responds to GET /api", async () => {
    const response = await request(app).get("/api")

    expect(response.status).toEqual(200)
  })
})
