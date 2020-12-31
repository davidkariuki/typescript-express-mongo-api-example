import type { NextFunction, Request, Response } from "express"
import DriverModel from "../models/driver"

const DriversController = {
  greeting(_req: Request, res: Response) {
    res.send({ hi: "there" })
  },
  create(req: Request, res: Response, next: NextFunction) {
    const driverProps = req.body

    DriverModel.create(driverProps)
      .then((driver) => {
        res.send(driver)
      })
      .catch(next)
  },
}

export default DriversController
