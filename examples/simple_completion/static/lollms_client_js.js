async function generateText(prompt, host="http://localhost:9600", model_name=null, personality=-1, n_predict=1024, stream=false, temperature=1024,top_k= 50, top_p= 0.95, repeat_penalty= 0.8, repeat_last_n=40, seed=null, n_threads=8) {
  const defaultOptions = {
    prompt: prompt,
    model_name: model_name,
    personality: personality,
    n_predict: n_predict,
    stream: stream, // Add this line
    temperature: temperature,
    top_k: top_k,
    top_p: top_p,
    repeat_penalty: repeat_penalty,
    repeat_last_n: repeat_last_n,
    seed: seed,
    n_threads: n_threads,
  };
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(defaultOptions),
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