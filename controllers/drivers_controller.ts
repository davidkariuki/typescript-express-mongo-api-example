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
  find(_req: Request, res: Response, next: NextFunction) {
    DriverModel.find({})
      .then((drivers) => {
        res.send(drivers)
      })
      .catch(next)
  },
  findOne(req: Request, res: Response, next: NextFunction) {
    const { id: _id } = req.params

    DriverModel.findOne({ _id })
      .then((drivers) => {
        res.send(drivers)
      })
      .catch(next)
  },
  deleteOne(req: Request, res: Response, next: NextFunction) {
    const { id: _id } = req.params

    DriverModel.deleteOne({ _id })
      .then((driver) => {
        res.status(204).send(driver)
      })
      .catch(next)
  },
}

export default DriversController
