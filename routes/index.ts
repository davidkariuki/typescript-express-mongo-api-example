import type { Express } from "express"
import DriversController from "../controllers/drivers_controller"

const routes = (app: Express) => {
  app.get("/api", DriversController.greeting)

  app.post("/api/drivers", DriversController.create)
}

export default routes
