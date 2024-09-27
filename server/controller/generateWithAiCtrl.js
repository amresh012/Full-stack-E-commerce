const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Your API Key
});

const generateProductDescription = async (req, res) => {
    console.log("Request body:", req.body); // Check the incoming request body
  
    const { productDetails } = req.body; // Ensure productDetails is destructured correctly
  
    if (!productDetails || !productDetails.name) {
      return res.status(400).send("Product details are missing or incomplete.");
    }
  
    try {
      const prompt = `
        Write a detailed and engaging product description for the following product:
        Name: ${productDetails.name}
        Category: ${productDetails.category}
        Features: ${productDetails.features.join(', ')}
      `;
  
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a product description generator.' },
          { role: 'user', content: prompt },
        ],
      });
  
      console.log("Generated description:", response.choices[0].message.content);
      return res.send(response.choices[0].message.content);
    } catch (error) {
      console.error('Error generating product description:', error);
      return res.status(500).send('Error generating product description');
    }
  };
  

// const  generateProductDescription = async (req, res)=> {
//     console.log(req.body)
//     const {productDetails}= req.body
//     console.log(productDetails.name)
//   try {
//     const prompt = `
//       Write a detailed and engaging product description for the following product:
//       Name: ${productDetails.name}
//       Category: ${productDetails.category}
//       Features: ${productDetails.features.join(', ')}
//     `;

//     const response = await openai.chat.completions.create({
//       model: 'gpt-4', // or 'gpt-3.5-turbo' for a faster response
//       messages: [
//         { role: 'system', content: 'You are a product description generator.' },
//         { role: 'user', content: prompt },
//       ],
//     });
//      console.log(response)
//     return res.send(response.choices[0].message.content);
//   } catch (error) {
//     console.error('Error generating product description:', error);
//   }
// }





module.exports = {generateProductDescription}