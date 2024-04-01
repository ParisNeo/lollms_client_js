async function generateText(prompt, host="http://localhost:9600", model_name=null, personality=-1, n_predict=1024, stream=false, temperature=0.1,top_k= 50, top_p= 0.95, repeat_penalty= 0.8, repeat_last_n=40, seed=null, n_threads=8) {
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
        console.log(data)
        let text = data.trim().replace(/\\"/g, '"');
        if (text[0] === '"') {
            text = text.substring(1);
        }
        if (text[text.length - 1] === '"') {
            text = text.substring(0, text.length - 1);
        }
        return text;
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      return { status: false, error: error.message };
    }
  }

  function listMountedPersonalities(host="http://localhost:9600") {
    fetch(`${host}/list_mounted_personalities`)
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
      })
      .catch(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
      });
  }