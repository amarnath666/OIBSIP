import { preMadePizzas, customPizza } from "../controllers/pizzaData";

const router = express.Router();

router.get("/pizaa-varieties", preMadePizzas);
router.get("/custom-pizza", customPizza);

export default router;