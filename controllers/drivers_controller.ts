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
  update(req: Request, res: Response, next: NextFunction) {
    const { id: _id } = req.params
    const driverProps = req.body

    DriverModel.findOneAndUpdate({ _id }, driverProps, { new: true })
      .then((driver) => {
        res.send(driver)
      })
      .catch(next)
  },
  index(req: Request, res: Response, next: NextFunction) {
    const { lng, lat } = req.query

    DriverModel.where("location")
      .near({
        center: {
          type: "Point",
          coordinates: [+(lng as string), +(lat as string)],
        },
        spherical: true,
        maxDistance: 50000,
      })
      .then((drivers) => {
        res.send(drivers)
      })
      .catch(next)
  },
  show(req: Request, res: Response, next: NextFunction) {
    const { id: _id } = req.params

    DriverModel.findOne({ _id })
      .then((drivers) => {
        res.send(drivers)
      })
      .catch(next)
  },
  delete(req: Request, res: Response, next: NextFunction) {
    const { id: _id } = req.params

    DriverModel.deleteOne({ _id })
      .then((driver) => {
        res.status(204).send(driver)
      })
      .catch(next)
  },
}

export default DriversController
