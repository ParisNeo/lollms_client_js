async function generateText(prompt, host="http://localhost:9600", options = {}) {
    const defaultOptions = {
      modelName: null,
      personality: -1,
      nPredict: 1024,
      temperature: 0.1,
      topK: 50,
      topP: 0.95,
      repeatPenalty: 0.8,
      repeatLastN: 40,
      seed: null,
      nThreads: 8,
    };
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        ...defaultOptions,
        ...options,
      }),
    };
  
    try {
      const response = await fetch(`${host}/lollms_generate`, requestOptions);
  
      if (response.ok) {
        const data = await response.text();
        return data;
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      return { status: false, error: error.message };
    }
  }

  