import type { Express } from "express"
import DriversController from "../controllers/drivers_controller"

const routes = (app: Express) => {
  app.get("/api", DriversController.greeting)
  app.post("/api/drivers", DriversController.create)
  app.get("/api/drivers", DriversController.index)
  app.get("/api/drivers/:id", DriversController.show)
  app.patch("/api/drivers/:id", DriversController.update)
  app.delete("/api/drivers/:id", DriversController.delete)
}

export default routes
