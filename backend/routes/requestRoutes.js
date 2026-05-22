const express = require("express");

const router = express.Router();

const {
    createRequest,
    getAllRequests,
    updateRequestStatus
} = require("../controllers/requestController");

router.post("/requests", createRequest);

router.get("/requests", getAllRequests);

router.patch("/requests/:id/status", updateRequestStatus);

router.get("/test", (req, res) => {
    res.send("Route Working");
});

module.exports = router;