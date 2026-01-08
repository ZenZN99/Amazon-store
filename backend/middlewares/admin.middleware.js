
export const adminMiddleware = (req, res, next) => {
  try {

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.user.role !== "Admin") {
      return res.status(403).json({ error: "Only admin can access this route" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
