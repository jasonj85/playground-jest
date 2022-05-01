import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
        { name: "Salted Caramel", imagePath: "/images/salted-caramel.png" },
      ])
    );
  }),
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot Fudge", imagePath: "/images/hot-fudge.png" },
        { name: "Cherries", imagePath: "/images/cherries.png" },
      ])
    );
  }),
];
