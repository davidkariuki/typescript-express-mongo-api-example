import { model, Schema, Document } from "mongoose"

export interface Point {
  type: string
  coordinates: number[]
}

export interface Driver {
  email: string
  driving?: boolean
  location: Point
}

const PointSchema = new Schema({
  type: { type: String, enum: ["Point"], required: true },
  coordinates: { type: [Number], required: true },
})

const DriverSchema = new Schema({
  email: { type: String, required: true, unique: true },
  driving: { type: Boolean, default: false },
  location: { type: PointSchema, index: "2dsphere" },
})

export type DriverDocument = Driver & Document & { location: Point }

export default model<DriverDocument>("drivers", DriverSchema)
