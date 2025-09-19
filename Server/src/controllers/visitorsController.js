import Visitor from "../models/visitorsModel.js";
import dayjs from "dayjs";
// Create a new visitor session
export const logVisit = async (req, res) => {
  try {
    const { visitorId, firebaseUid, userAgent } = req.body;
    const today = dayjs().format("YYYY-MM-DD");
    console.log("Logging visit:", { visitorId, firebaseUid, userAgent });
    
    let visitor;

    // If we already have visitorId, update
    if (visitorId) {
      visitor = await Visitor.findById(visitorId);
      if (visitor) {
        const todayEntry = visitor.visits.find(v => v.date === today);
        if (todayEntry) {
          todayEntry.count += 1;
        } else {
          visitor.visits.push({ date: today, count: 1 });
        }
        await visitor.save();
        return res.json(visitor);
      }
    }

    // If user logged in with Firebase, search by UID
    if (firebaseUid) {
      visitor = await Visitor.findOne({ firebaseUid });
      if (visitor) {
        const todayEntry = visitor.visits.find(v => v.date === today);
        if (todayEntry) {
          todayEntry.count += 1;
        } else {
          visitor.visits.push({ date: today, count: 1 });
        }
        await visitor.save();
        return res.json(visitor);
      }
    }

    // Create new visitor
    const newVisitor = await Visitor.create({
      userId: firebaseUid || null,
      userAgent,
      visits: [{ date: today, count: 1 }]
    });

    res.status(201).json(newVisitor);
  } catch (err) {
    console.error("logVisit error:", err);
    res.status(500).json({ error: err.message });
  }
};


// ---- Product View ----
export const logProductView = async (req, res) => {
  try {
    const { visitorId, userId, productId } = req.body;
    const visitor = await findVisitor(visitorId, userId);
    if (!visitor) return res.status(404).json({ error: "Visitor not found" });

    if (!visitor.productsViewed.includes(productId)) {
      visitor.productsViewed.push(productId);
      await visitor.save();
    }
    res.json(visitor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---- Search ----
export const logSearch = async (req, res) => {
  try {
    const { visitorId, userId, term } = req.body;
    const visitor = await findVisitor(visitorId, userId);
    if (!visitor) return res.status(404).json({ error: "Visitor not found" });

    visitor.searches.push(term);
    await visitor.save();
    res.json(visitor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---- Page Visit ----
export const logPageVisit = async (req, res) => {
  try {
    const { visitorId, userId, page } = req.body;
    const today = dayjs().format("YYYY-MM-DD");
    const visitor = await findVisitor(visitorId, userId);
    if (!visitor) return res.status(404).json({ error: "Visitor not found" });

    // update daily visit count
    const todayEntry = visitor.visits.find(v => v.date === today);
    if (todayEntry) todayEntry.count += 1;
    else visitor.visits.push({ date: today, count: 1 });

    visitor.pagesViewed.push(page);
    await visitor.save();
    res.json(visitor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all visitors (dashboard)
export const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().populate("productsViewed", "name price");
    res.json(visitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
