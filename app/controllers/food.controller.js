const axios = require('axios');
const edamamConfig = require("../config/edamam.config");

exports.getFoodAutocomplete = async (req,res) => {
    try {
        const params = req.query;
        const response = await axios.get(`${edamamConfig.BASE_URL}/recipes/v2`, {
            params: {
                type: "public",
                app_id: edamamConfig.APP_ID,
                app_key: edamamConfig.APP_KEY,
                diet: params.diet || 'balanced',
                random: true,
                mealType: params.mealType
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error al llamar a la API de Edamam:', error);
        res.status(500).json({ error: 'Error al obtener datos de la API de Edamam' });
    }
}