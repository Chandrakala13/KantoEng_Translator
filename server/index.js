const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple Kannada to English dictionary for common words
const kannadaDict = {
  'ನಮಸ್ಕಾರ': 'Hello',
  'ಧನ್ಯವಾದ': 'Thank you',
  'ಹೇಗಿದ್ದೀರಿ': 'How are you',
  'ಚೆನ್ನಾಗಿದೆ': 'Good',
  'ಬಾಯಿ': 'Food',
  'ನೀರು': 'Water',
  'ಮನೆ': 'House',
  'ಕೆಲಸ': 'Work',
  'ಸಮಯ': 'Time',
  'ಹೆಸರು': 'Name',
  'ಏನು': 'What',
  'ಯಾವುದು': 'Which',
  'ಎಲ್ಲಿ': 'Where',
  'ಯಾಕೆ': 'Why',
  'ಹೇಗೆ': 'How',
  'ಬಂದಿದ್ದಾರೆ': 'Came',
  'ಹೋಗುತ್ತಿದ್ದಾರೆ': 'Going',
  'ಮಾಡುತ್ತಿದ್ದಾರೆ': 'Doing',
  'ಕಾಣುತ್ತಿದ್ದಾರೆ': 'Seeing',
  'ತಿಳಿದಿದೆ': 'Known',
  'ಬರೆ': 'Write',
  'ಓದು': 'Read',
  'ತಿನ್ನು': 'Eat',
  'ಕುಡಿ': 'Drink',
  'ನಿದ್ರೆ': 'Sleep',
  'ಎಚ್ಚರ': 'Wake up',
  'ಬಾ': 'Come',
  'ಹೋಗು': 'Go',
  'ನಿಲ್ಲು': 'Stop',
  'ಕುಳಿತ': 'Sit',
  'ನಿಂತ': 'Stand',
  'ದಿನ': 'Day',
  'ರಾತ್ರಿ': 'Night',
  'ಬೆಳಗ್ಗೆ': 'Morning',
  'ಸಂಜೆ': 'Evening',
  'ಇಂದು': 'Today',
  'ನಾಳೆ': 'Tomorrow',
  'ಹಿಂದೆ': 'Yesterday',
  'ದೇಶ': 'Country',
  'ನಗರ': 'City',
  'ಗ್ರಾಮ': 'Village',
  'ರಸ್ತೆ': 'Road',
  'ಕಾರು': 'Car',
  'ಬಸ್': 'Bus',
  'ರೈಲು': 'Train',
  'ವಿಮಾನ': 'Airplane',
  'ತಾಯಿ': 'Mother',
  'ತಂದೆ': 'Father',
  'ಅಣ್ಣ': 'Brother',
  'ತಂಗಿ': 'Sister',
  'ಮಗ': 'Son',
  'ಮಗಳು': 'Daughter',
  'ಹೆಂಡತಿ': 'Wife',
  'ಗಂಡ': 'Husband',
  'ಸ್ನೇಹಿತ': 'Friend',
  'ಶಿಕ್ಷಕ': 'Teacher',
  'ವಿದ್ಯಾರ್ಥಿ': 'Student',
  'ವೈದ್ಯ': 'Doctor',
  'ಕಾರ್ಮಿಗ': 'Worker',
  'ಹುಟ್ಟಿದ': 'Born',
  'ಸಾಯುತ': 'Die',
  'ಪ್ರೀತಿ': 'Love',
  'ಸಂತೋಷ': 'Happy',
  'ದುಃಖ': 'Sad',
  'ಭಯ': 'Fear',
  'ಕೋಪ': 'Anger',
  'ನಗು': 'Smile',
  'ಅಣಕು': 'Cry',
  'ಮಾತಾಡು': 'Talk',
  'ಕೇಳು': 'Listen',
  'ತೋರಿಸು': 'Show',
  'ತಿರುಗು': 'Return',
  'ಬಿಡು': 'Leave',
  'ತೆಗೆ': 'Take',
  'ಕೊಡು': 'Give',
  'ತೆಗೆದುಕೊ': 'Accept',
  'ಬರಹ': 'Letter',
  'ಪುಸ್ತಕ': 'Book',
  'ಕಾಗದ': 'Paper',
  'ಲೇಖನ': 'Article',
  'ಸುದ್ದಿ': 'News',
  'ದೂರವಾಣಿ': 'Telephone',
  'ಕಂಪ್ಯೂಟರ್': 'Computer',
  'ಇಂಟರ್ನೆಟ್': 'Internet',
  'ವಿದ್ಯುತ್': 'Electricity',
  'ಬೆಂಕಿ': 'Fire',
  'ನೆಲ': 'Ground',
  'ಆಕಾಶ': 'Sky',
  'ಸೂರ್ಯ': 'Sun',
  'ಚಂದ್ರ': 'Moon',
  'ನಕ್ಷತ್ರ': 'Star',
  'ಮೋಡ': 'Cloud',
 ಮಳೆ: 'Rain',
  'ಗಾಳಿ': 'Wind',
  'ಬಿಸಿಲು': 'Sunshine',
  'ಚಳಿ': 'Cold',
  'ಬೆಚ್ಚಗೆ': 'Warm',
  'ಹಸಿರು': 'Green',
  'ಕೆಂಪು': 'Red',
  'ನೀಲಿ': 'Blue',
  'ಹಳದಿ': 'Yellow',
  'ಬಿಳಿ': 'White',
  'ಕಪ್ಪು': 'Black',
  'ದೊಡ್ಡ': 'Big',
  'ಚಿಕ್ಕ': 'Small',
  'ಎತ್ತರ': 'Tall',
  'ಕುಳ್ಳ': 'Short',
  'ಭಾರ': 'Heavy',
  'ಹಗುರ': 'Light',
  'ಹೊಸ': 'New',
  'ಹಳೆ': 'Old',
  'ಚೆನ್ನಾದ': 'Beautiful',
  'ಕೆಟ್ಟ': 'Bad',
  'ವೇಗ': 'Fast',
  'ನಿಧಾನ': 'Slow',
  'ಸರಿ': 'Correct',
  'ತಪ್ಪು': 'Wrong',
  'ಸಾಧ್ಯ': 'Possible',
  'ಅಸಾಧ್ಯ': 'Impossible',
  'ಬೇಕು': 'Need',
  'ಬೇಡ': 'Not need',
  'ಇದೆ': 'There is',
  'ಇಲ್ಲ': 'There is not',
  'ಮುಂದೆ': 'Front',
  'ಹಿಂದೆ': 'Back',
  'ಮೇಲೆ': 'Above',
  'ಕೆಳಗೆ': 'Below',
  'ಒಳಗೆ': 'Inside',
  'ಹೊರಗೆ': 'Outside',
  'ಬಲ': 'Right',
  'ಎಡ': 'Left',
  'ಮಧ್ಯ': 'Middle',
  'ಆರಂಭ': 'Start',
  'ಅಂತ್ಯ': 'End',
  'ಮೊದಲು': 'First',
  'ಕೊನೆ': 'Last',
  'ಹೆಚ್ಚು': 'More',
  'ಕಡಿಮೆ': 'Less',
  'ಸಮಾನ': 'Equal',
  'ಭಿನ್ನ': 'Different',
  'ಎಲ್ಲಾ': 'All',
  'ಯಾವುದೇ': 'Any',
  'ಏನಾದರೂ': 'Something',
  'ಏನೂವಿಲ್ಲ': 'Nothing',
  'ಹೌದು': 'Yes',
  'ಇಲ್ಲ': 'No',
  'ಬಹುಶಃ': 'Maybe',
  'ಖಂಡಿತ': 'Definitely',
  'ತಕ್ಷಣ': 'Immediately',
  'ನಂತರ': 'After',
  'ಮುಂಚೆ': 'Before',
  'ಈಗ': 'Now',
  'ಆಗ': 'Then',
  'ಸದಾ': 'Always',
  'ಎಂದಿಗೂ': 'Never',
  'ಆಗಾಗ': 'Sometimes',
  'ಪುನಃ': 'Again',
  'ಮತ್ತೆ': 'Again',
  'ಇನ್ನು': 'Still',
  'ಈಗಾಗಲೇ': 'Already',
  'ಇನ್ನೂ': 'Yet',
  'ಬಹಳ': 'Very',
  'ಸ್ವಲ್ಪ': 'Little',
  'ಅಧಿಕ': 'More',
  'ಕಡಿಮೆ': 'Less'
};

// Translation endpoint
app.post('/api/translate', async (req, res) => {
  try {
    const { text, from = 'kn', to = 'en' } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    let translated = '';
    
    // Check if it's Kannada to English
    if (from === 'kn' && to === 'en') {
      // Try dictionary lookup first
      const words = text.trim().split(/\s+/);
      const translatedWords = words.map(word => {
        const cleanWord = word.replace(/[^\u0C80-\u0CFF]/g, ''); // Remove non-Kannada chars
        return kannadaDict[cleanWord] || word;
      });
      translated = translatedWords.join(' ');
      
      // If dictionary didn't help, try MyMemory API
      if (translated === text || translatedWords.every((w, i) => w === words[i])) {
        try {
          const response = await axios.get('https://api.mymemory.translated.net/get', {
            params: { q: text, langpair: 'kn|en' }
          });
          if (response.data.responseStatus === 200) {
            translated = response.data.responseData.translatedText;
          }
        } catch (apiErr) {
          console.log('API fallback:', apiErr.message);
        }
      }
    } else {
      // For other language pairs, use MyMemory API
      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: { q: text, langpair: `${from}|${to}` }
      });
      if (response.data.responseStatus === 200) {
        translated = response.data.responseData.translatedText;
      } else {
        return res.status(500).json({ error: 'Translation failed' });
      }
    }
    
    res.json({ 
      original: text, 
      translated,
      from,
      to 
    });
  } catch (error) {
    console.error('Translation error:', error.message);
    res.status(500).json({ error: 'Translation failed: ' + error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});