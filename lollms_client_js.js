class LollmsClient {
  constructor(hostAddress = null, modelName = null, personality = -1, nPredict = 1024, temperature = 0.1, topK = 50, topP = 0.95, repeatPenalty = 0.8, repeatLastN = 40, seed = null, nThreads = 8, serviceKey = "") {
      this.hostAddress = hostAddress;
      this.modelName = modelName;
      this.nPredict = nPredict;
      this.personality = personality;
      this.temperature = temperature;
      this.topK = topK;
      this.topP = topP;
      this.repeatPenalty = repeatPenalty;
      this.repeatLastN = repeatLastN;
      this.seed = seed;
      this.nThreads = nThreads;
      this.serviceKey = serviceKey;
  }

  async generateText(prompt, hostAddress = this.hostAddress, modelName = this.modelName, personality = this.personality, nPredict = this.nPredict, stream = false, temperature = this.temperature, topK = this.topK, topP = this.topP, repeatPenalty = this.repeatPenalty, repeatLastN = this.repeatLastN, seed = this.seed, nThreads = this.nThreads, serviceKey = this.serviceKey, streamingCallback = null) {
      const url = `${hostAddress}/lollms_generate`;
      const headers = serviceKey !== "" ? {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${serviceKey}`,
      } : {
          'Content-Type': 'application/json',
      };

      const data = JSON.stringify({
          prompt: prompt,
          model_name: modelName,
          personality: personality,
          n_predict: nPredict,
          stream: stream,
          temperature: temperature,
          top_k: topK,
          top_p: topP,
          repeat_penalty: repeatPenalty,
          repeat_last_n: repeatLastN,
          seed: seed,
          n_threads: nThreads
      });

      try {
          const response = await fetch(url, {
              method: 'POST',
              headers: headers,
              body: data
          });
          return await response.json();
      } catch (error) {
          console.error(error);
          return null;
      }
  }

  async generate_completion(prompt, hostAddress = this.hostAddress, modelName = this.modelName, personality = this.personality, nPredict = this.nPredict, stream = false, temperature = this.temperature, topK = this.topK, topP = this.topP, repeatPenalty = this.repeatPenalty, repeatLastN = this.repeatLastN, seed = this.seed, nThreads = this.nThreads, completionFormat = "vllm instruct", serviceKey = this.serviceKey, streamingCallback = null) {
      const url = `${hostAddress}/generate_completion`;
      const headers = serviceKey !== "" ? {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${serviceKey}`,
      } : {
          'Content-Type': 'application/json',
      };

      const data = JSON.stringify({
          prompt: prompt,
          model_name: modelName,
          personality: personality,
          n_predict: nPredict,
          stream: stream,
          temperature: temperature,
          top_k: topK,
          top_p: topP,
          repeat_penalty: repeatPenalty,
          repeat_last_n: repeatLastN,
          seed: seed,
          n_threads: nThreads,
          completion_format: completionFormat
      });

      try {
          const response = await fetch(url, {
              method: 'POST',
              headers: headers,
              body: data
          });
          if (stream && streamingCallback) {
              // Note: Streaming with Fetch API in the browser might not work as expected because Fetch API does not support HTTP/2 server push.
              // You would need a different approach for real-time streaming.
              streamingCallback(await response.json(), 'MSG_TYPE_CHUNK');
          } else {
              return await response.json();
          }
      } catch (error) {
          console.error("Error generating completion:", error);
          return null;
      }
  }

  async listMountedPersonalities(hostAddress = this.hostAddress) {
      const url = `${hostAddress}/list_mounted_personalities`;

      try {
          const response = await fetch(url);
          return await response.json();
      } catch (error) {
          console.error(error);
          return null;
      }
  }

  async listModels(hostAddress = this.hostAddress) {
      const url = `${hostAddress}/list_models`;

      try {
          const response = await fetch(url);
          return await response.json();
      } catch (error) {
          console.error(error);
          return null;
      }
  }
}