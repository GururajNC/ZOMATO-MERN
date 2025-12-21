import express from "express"
import foodMiddleware from "../middlerware/food.middleware.js";
import foodPatnerController from "../controller/food.partner.controller.js";

const router=express.Router();


// api -- >get  api/food-partner/:id

router.get(
    "/:id",
    foodMiddleware.authFoodPartnerMiddleware,
    foodPatnerController.getFoodPatnerById
)



export default router;
