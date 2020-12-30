import type { Request, Response } from "express"
import DriverModel from "../models/driver"

const DriversController = {
  greeting(_req: Request, res: Response) {
    res.send({ hi: "there" })
  },
  async create(req: Request, res: Response) {
    const driverProps = req.body
    const driver = await DriverModel.create(driverProps)

    res.send(driver)
  },
}

export default DriversController
