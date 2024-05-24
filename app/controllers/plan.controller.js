const axios = require('axios');
const mongoose = require('mongoose');
const db = require("../models");
const User = db.user;
const Recipe = db.recipe;
const Plan = db.plan;

exports.getPlanner = async (req, res) => {
    try {
        const { userId, date } = req.query;

        if (!userId || !date) {
            return res.status(400).json({ error: 'userId and date are required query parameters' });
        }

        const userIdObjectId = mongoose.Types.ObjectId(userId);
        
        // Buscar el plan para el usuario y la fecha especificados
        let plan = await Plan.findOne({ userId: userIdObjectId, date: date });

        // Si no se encuentra un plan, crear uno nuevo
        if (!plan) {
            plan = new Plan({ userId: userIdObjectId, date: date });
            await plan.save();
        }

        res.status(200).json({ plan });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the plan', details: error.message });
    }
};

exports.postPlanner = async (req, res) => {
    try {
        const { userId, date, breakfast, snack, lunch, teatime, dinner } = req.body;

        const userIdObjectId = mongoose.Types.ObjectId(userId);

        const plan = await Plan.findOne({ userId: userIdObjectId, date: date });
        if (!plan) {

            const newPlan = await Plan.create({
                userId: userId,
                date: date,
                breakfast: breakfast,
                snack: snack,
                lunch: lunch,
                teatime: teatime,
                dinner: dinner
            });
            res.status(200).json({ message: 'Plan created successfully' });
        } else {

            const updatedPlan = await Plan.findOneAndUpdate(
                { userId: userId, date: date },
                {
                    breakfast: breakfast,
                    snack: snack,
                    lunch: lunch,
                    teatime: teatime,
                    dinner: dinner
                },
                { new: true }
            );
            res.status(200).json({ message: 'Plan updated successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while modifying user likes', details: error.message });
    }
};
