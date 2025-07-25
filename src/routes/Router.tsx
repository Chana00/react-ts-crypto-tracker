import { createBrowserRouter } from "react-router";
import Coins from "./Coins";
import Coin from "./Coin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Coins />
    },
    {
        path: "/:coinId",
        element: <Coin />
    }
]);

export default router;