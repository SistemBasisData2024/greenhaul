import jsonwebtoken, { decode } from "jsonwebtoken";

import { db } from "../config/db.js";

const jwt = jsonwebtoken;

export const requireAdmin = async (req, res, next) => {
  const header = req.headers.authorization || req.headers.Authorization;

  if (!header?.startsWith("Bearer "))
    return res.status(403).json({
      result: null,
      message: "You're not authorized!",
      authorized: false,
    });

  const token = header.split(" ")[1];

  // prettier-ignore
  if (!!token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (!!err) {
        return res.status(403).json({ result: null, message: "You don't have the authorization!", authorized: false });
      } else {
        const { id, role } = decoded;

        const check = await db.query("SELECT * FROM admin WHERE id = $1", [id]);

        if (role !== "admin" || !check.rows[0])
          return res.status(403).json({ result: null, message: "You're not authorized to access this route!", authorized: false })

        next();
      }
    });
  } else {
    return res.status(403).json({ result: null, message: "You don't have the authorization!", authorized: false })
  }
};
