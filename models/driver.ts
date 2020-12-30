import { model, Schema, Document } from "mongoose"

export interface Driver {
  email: string
  driving: boolean
}

const DriverSchema = new Schema({
  email: { type: String, required: true },
  driving: { type: Boolean, default: false },
})

export type DriverDocument = Driver & Document

export default model<DriverDocument>("drivers", DriverSchema)
