const Request = require("../models/Request");

const calculateCostCategory = (resourceType, durationDays, usageEstimate) => {

    if (
        resourceType.toLowerCase().includes("vm") &&
        usageEstimate > 80 &&
        durationDays > 30
    ) {
        return "High";
    }

    if (usageEstimate > 40) {
        return "Medium";
    }

    return "Low";
};

exports.createRequest = async (req, res) => {

    try {

        const {
            requesterName,
            purpose,
            durationDays,
            usageEstimate,
            accessJustification,
            owner
        } = req.body;

        if (!requesterName || !purpose || !accessJustification || !owner) {
            return res.status(400).json({
                message: "All mandatory fields are required"
            });
        }

        if (durationDays <= 0) {
            return res.status(400).json({
                message: "Duration must be greater than 0"
            });
        }

        if (usageEstimate <= 0) {
            return res.status(400).json({
                message: "Usage estimate must be greater than 0"
            });
        }

        const costCategory = calculateCostCategory(
            req.body.resourceType,
            durationDays,
            usageEstimate
        );

        const newRequest = new Request({
            ...req.body,
            costCategory
        });

        await newRequest.save();

        res.status(201).json(newRequest);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.getAllRequests = async (req, res) => {

    try {

        const requests = await Request.find();

        res.status(200).json(requests);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateRequestStatus = async (req, res) => {

    try {

        const { status, reviewerComments } = req.body;

        const updatedRequest = await Request.findByIdAndUpdate(
            req.params.id,
            {
                status,
                reviewerComments
            },
            { new: true }
        );

        res.status(200).json(updatedRequest);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};