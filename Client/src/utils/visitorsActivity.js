export async function logVisitorAction(type, payload) {
  try {
    await fetch(`http://localhost:8080/api/visitors/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Visitor log failed:", err);
  }
}

export function getIds(user) {
  return {
    visitorId: localStorage.getItem("visitorId"),
    userId: user ? user.uid : null, // if you map firebaseUid → User._id, adjust accordingly
  };
}
