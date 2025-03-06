const express = require('express');
const router = express.Router();

// Suponiendo que tienes una función para obtener datos de acciones
async function getStockPrice(symbol) {
  // Aquí debes implementar la lógica para obtener el precio del stock
  // Por ejemplo, podrías hacer una solicitud a una API de mercado de valores
  return {
    price: Math.random() * 100, // Simulación de precio
    likes: 0, // Puedes cambiar esto según la lógica de tu base de datos
  };
}

router.get('/stock-prices', async (req, res) => {
  const stockSymbols = req.query.stock;

  if (!stockSymbols) {
    return res.status(400).json({ error: 'Stock symbol is required' });
  }

  const symbolsArray = Array.isArray(stockSymbols) ? stockSymbols : [stockSymbols];

  if (symbolsArray.length === 2) {
    const [stock1, stock2] = symbolsArray;

    const stockData1 = await getStockPrice(stock1);
    const stockData2 = await getStockPrice(stock2);

    if (!stockData1 || !stockData2) {
      return res.status(404).json({ error: 'One or more stocks not found' });
    }

    return res.json({
      stockData: [
        {
          symbol: stock1,
          price: stockData1.price,
          rel_likes: stockData1.likes - stockData2.likes
        },
        {
          symbol: stock2,
          price: stockData2.price,
          rel_likes: stockData2.likes - stockData1.likes
        }
      ]
    });
  } else {
    const stockSymbol = symbolsArray[0];
    const stockData = await getStockPrice(stockSymbol);
    
    if (!stockData) {
      return res.status(404).json({ error: 'Stock not found' });
    }

    return res.json({
      stockData: {
        symbol: stockSymbol,
        price: stockData.price,
        likes: stockData.likes
      }
    });
  }
});

module.exports = router;
