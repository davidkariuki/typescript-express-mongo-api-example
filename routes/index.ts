import type { Express } from "express"
import DriversController from "../controllers/drivers_controller"

const routes = (app: Express) => {
  app.get("/api", DriversController.greeting)
  app.post("/api/drivers", DriversController.create)
  app.get("/api/drivers", DriversController.find)
  app.get("/api/drivers/:id", DriversController.findOne)
  app.patch("/api/drivers/:id", DriversController.update)
  app.delete("/api/drivers/:id", DriversController.deleteOne)
}

export default routes
