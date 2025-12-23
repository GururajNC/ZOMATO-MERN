import express from "express";
import foodController from "../controller/food.controller.js";
import foodMiddleware from "../middlerware/food.middleware.js";
import multer from "multer";


const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();

// api ---> /api/food/      [protected];
router.post(
    "/",
    foodMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood
)

// get food item 

router.get(
    "/",
    foodMiddleware.authUserMiddleware,
    foodController.getFood
)


router.post(
    "/like",
    foodMiddleware.authUserMiddleware,
    foodController.likeFood
)

router.post(
    "/save",
    foodMiddleware.authUserMiddleware,
    foodController.saveFood
)


router.get(
    "/save",
    foodMiddleware.authUserMiddleware,
    foodController.getSaveFood
)

export default router;
