const axios = require('axios');

exports.getFoodAutocomplete = async (req,res) => {
    try {
        const params = req.query;
        const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
            params: {
                type: "public",
                app_id: "cb12cff7",
                app_key: "348cbb8aa7b403805e49c3747071fbb3",
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