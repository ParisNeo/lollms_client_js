// JavaScript equivalent of the ELF_GENERATION_FORMAT enum
const ELF_GENERATION_FORMAT = {
    LOLLMS: 0,
    OPENAI: 1,
    OLLAMA: 2,
    LITELLM: 2
};
  
// JavaScript equivalent of the ELF_COMPLETION_FORMAT enum
const ELF_COMPLETION_FORMAT = {
    Instruct: 0,
    Chat: 1
};

// Ensuring the objects are immutable
Object.freeze(ELF_GENERATION_FORMAT);
Object.freeze(ELF_COMPLETION_FORMAT);


class TikToken {
    static Models = {
        GPT2: 'gpt2',
        R50K_BASE: 'r50k_base',
        P50K_BASE: 'p50k_base',
        P50K_EDIT: 'p50k_edit',
        CL100K_BASE: 'cl100k_base'
      };
    
      constructor(model_name, registryUrl) {
        if (!Object.values(TikToken.Models).includes(model_name)) {
          throw new Error(`Invalid model name: ${model_name}. Please use one of the predefined models.`);
        }
        this.model_name = model_name;
        this.registryUrl = registryUrl;
        this.vocabulary = {
          tokenToIndex: {},
          indexToToken: {}
        };
      }
  
    async loadVocabulary() {
      const modelVocabUrl = `https://openaipublic.blob.core.windows.net/${this.model_name}/encodings/main/encoder.json`;
      
      try {
        const response = await fetch(modelVocabUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.vocabulary.tokenToIndex = await response.json();
        this.vocabulary.indexToToken = Object.fromEntries(
          Object.entries(this.vocabulary.tokenToIndex).map(([token, index]) => [index, token])
        );
      } catch (error) {
        console.error('Error loading vocabulary:', error);
      }
    }
  
    encode(text) {
      // Encoding logic would go here, using this.vocabulary.tokenToIndex
      // Assuming that 'text' is a string to be encoded into an array of token indices
      return text.split('').map(char => {
        return this.vocabulary.tokenToIndex[char] || char.charCodeAt(0);
      });
    }
  
    decode(tokens) {
      // Decoding logic would go here, using this.vocabulary.indexToToken
      // Assuming that 'tokens' is an array of token indices to be decoded into a string
      return tokens.map(token => {
        return this.vocabulary.indexToToken[token] || String.fromCharCode(token);
      }).join('');
    }
  }

  

class LollmsClient {
    constructor(
      host_address = null,
      model_name = null,
      ctx_size = 4096,
      personality = -1,
      n_predict = 1024,
      temperature = 0.1,
      top_k = 50,
      top_p = 0.95,
      repeat_penalty = 0.8,
      repeat_last_n = 40,
      seed = null,
      n_threads = 8,
      service_key = "",
      tokenizer = null,
      default_generation_mode = ELF_GENERATION_FORMAT.LOLLMS
    ) {
      // Handle the import or initialization of tiktoken equivalent in JavaScript
      // this.tokenizer = new TikTokenJS('gpt-3.5-turbo-1106'); // This is hypothetical
      if (!tokenizer) {
        this.tokenizer = new TikToken(TikToken.Models.CL100K_BASE, "https://raw.githubusercontent.com/ParisNeo/tiktoken/main/tiktoken/registry.json");
        this.tokenizer.loadVocabulary()
      } else {
        this.tokenizer = tokenizer;
      }
  
      this.host_address = host_address;
      this.model_name = model_name;
      this.ctx_size = ctx_size;
      this.n_predict = n_predict;
      this.personality = personality;
      this.temperature = temperature;
      this.top_k = top_k;
      this.top_p = top_p;
      this.repeat_penalty = repeat_penalty;
      this.repeat_last_n = repeat_last_n;
      this.seed = seed;
      this.n_threads = n_threads;
      this.service_key = service_key;
      this.default_generation_mode = default_generation_mode;
    }
    tokenize(prompt) {
        /**
         * Tokenizes the given prompt using the model's tokenizer.
         *
         * @param {string} prompt - The input prompt to be tokenized.
         * @returns {Array} A list of tokens representing the tokenized prompt.
         */
        const tokensList = this.tokenizer.encode(prompt);
        return tokensList;
      }
    
    detokenize(tokensList) {
        /**
         * Detokenizes the given list of tokens using the model's tokenizer.
         *
         * @param {Array} tokensList - A list of tokens to be detokenized.
         * @returns {string} The detokenized text as a string.
         */
        const text = this.tokenizer.decode(tokensList);
        return text;
      }
    generate(prompt, {
        n_predict = null,
        stream = false,
        temperature = 0.1,
        top_k = 50,
        top_p = 0.95,
        repeat_penalty = 0.8,
        repeat_last_n = 40,
        seed = null,
        n_threads = 8,
        service_key = "",
        streamingCallback = null
      } = {}) {
        switch (this.default_generation_mode) {
          case ELF_GENERATION_FORMAT.LOLLMS:
            return this.lollms_generate(prompt, this.host_address, this.model_name, -1, n_predict, stream, temperature, top_k, top_p, repeat_penalty, repeat_last_n, seed, n_threads, service_key, streamingCallback);
          case ELF_GENERATION_FORMAT.OPENAI:
            return this.openai_generate(prompt, this.host_address, this.model_name, -1, n_predict, stream, temperature, top_k, top_p, repeat_penalty, repeat_last_n, seed, n_threads, ELF_COMPLETION_FORMAT.INSTRUCT, service_key, streamingCallback);
          case ELF_GENERATION_FORMAT.OLLAMA:
            return this.ollama_generate(prompt, this.host_address, this.model_name, -1, n_predict, stream, temperature, top_k, top_p, repeat_penalty, repeat_last_n, seed, n_threads, ELF_COMPLETION_FORMAT.INSTRUCT, service_key, streamingCallback);
          case ELF_GENERATION_FORMAT.LITELLM:
            return this.litellm_generate(prompt, this.host_address, this.model_name, -1, n_predict, stream, temperature, top_k, top_p, repeat_penalty, repeat_last_n, seed, n_threads, ELF_COMPLETION_FORMAT.INSTRUCT, service_key, streamingCallback);
          default:
            throw new Error('Invalid generation mode');
        }
      }
    async generateText(prompt, options = {}) {
        // Destructure with default values from `this` if not provided in `options`
        const {
            host_address = this.host_address,
            model_name = this.model_name,
            personality = this.personality,
            n_predict = this.n_predict,
            stream = false,
            temperature = this.temperature,
            top_k = this.top_k,
            top_p = this.top_p,
            repeat_penalty = this.repeat_penalty,
            repeat_last_n = this.repeat_last_n,
            seed = this.seed,
            n_threads = this.n_threads,
            service_key = this.service_key,
            streamingCallback = null
        } = options;

        try {
            const result = await this.lollms_generate(
            prompt,
            host_address,
            model_name,
            personality,
            n_predict,
            stream,
            temperature,
            top_k,
            top_p,
            repeat_penalty,
            repeat_last_n,
            seed,
            n_threads,
            service_key,
            streamingCallback
            );
            return result;
        } catch (error) {
            // Handle any errors that occur during generation
            console.error('An error occurred during text generation:', error);
            throw error; // Re-throw the error if you want to allow the caller to handle it as well
        }
    }
    async lollms_generate(prompt, host_address = this.host_address, model_name = this.model_name, personality = this.personality, n_predict = this.n_predict, stream = false, temperature = this.temperature, top_k = this.top_k, top_p = this.top_p, repeat_penalty = this.repeat_penalty, repeat_last_n = this.repeat_last_n, seed = this.seed, n_threads = this.n_threads, service_key = this.service_key, streamingCallback = null) {
      const url = `${host_address}/lollms_generate`;
      const headers = service_key !== "" ? {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${service_key}`,
      } : {
          'Content-Type': 'application/json',
      };

      const data = JSON.stringify({
          prompt: prompt,
          model_name: model_name,
          personality: personality,
          n_predict: n_predict,
          stream: stream,
          temperature: temperature,
          top_k: top_k,
          top_p: top_p,
          repeat_penalty: repeat_penalty,
          repeat_last_n: repeat_last_n,
          seed: seed,
          n_threads: n_threads
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


  
  async openai_generate(prompt, host_address = this.host_address, model_name = this.model_name, personality = this.personality, n_predict = this.n_predict, stream = false, temperature = this.temperature, top_k = this.top_k, top_p = this.top_p, repeat_penalty = this.repeat_penalty, repeat_last_n = this.repeat_last_n, seed = this.seed, n_threads = this.n_threads, ELF_COMPLETION_FORMAT = "vllm instruct", service_key = this.service_key, streamingCallback = null) {
      const url = `${host_address}/generate_completion`;
      const headers = service_key !== "" ? {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${service_key}`,
      } : {
          'Content-Type': 'application/json',
      };

      const data = JSON.stringify({
          prompt: prompt,
          model_name: model_name,
          personality: personality,
          n_predict: n_predict,
          stream: stream,
          temperature: temperature,
          top_k: top_k,
          top_p: top_p,
          repeat_penalty: repeat_penalty,
          repeat_last_n: repeat_last_n,
          seed: seed,
          n_threads: n_threads,
          completion_format: ELF_COMPLETION_FORMAT
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

  async listMountedPersonalities(host_address = this.host_address) {
      const url = `${host_address}/list_mounted_personalities`;

      try {
          const response = await fetch(url);
          return await response.json();
      } catch (error) {
          console.error(error);
          return null;
      }
  }

  async listModels(host_address = this.host_address) {
      const url = `${host_address}/list_models`;

      try {
          const response = await fetch(url);
          return await response.json();
      } catch (error) {
          console.error(error);
          return null;
      }
  }
}

class TasksLibrary {
  constructor(lollms) {
    this.lollms = lollms;
  }

  async translateTextChunk(textChunk, outputLanguage = "french", host_address = null, model_name = null, temperature = 0.1, maxGenerationSize = 3000) {
    const translationPrompt = [
      `!@>system:`,
      `Translate the following text to ${outputLanguage}.`,
      `Be faithful to the original text and do not add or remove any information.`,
      `Respond only with the translated text.`,
      `Do not add comments or explanations.`,
      `!@>text to translate:`,
      `${textChunk}`,
      `!@>translation:`,
    ].join("\n");

    const translated = await this.lollms.generateText(
      translationPrompt,
      host_address,
      model_name,
      -1, // personality
      maxGenerationSize, // n_predict
      false, // stream
      temperature, // temperature
      undefined, // top_k, using undefined to fallback on LollmsClient's default
      undefined, // top_p, using undefined to fallback on LollmsClient's default
      undefined, // repeat_penalty, using undefined to fallback on LollmsClient's default
      undefined, // repeat_last_n, using undefined to fallback on LollmsClient's default
      undefined, // seed, using undefined to fallback on LollmsClient's default
      undefined, // n_threads, using undefined to fallback on LollmsClient's default
      undefined // service_key, using undefined to fallback on LollmsClient's default
    );

    return translated;
  }
  async summarizeText(textChunk, summaryLength = "short", host_address = null, model_name = null, temperature = 0.1, maxGenerationSize = 1000) {
    const summaryPrompt = [
      `system:`,
      `Summarize the following text in a ${summaryLength} manner.`,
      `Keep the summary concise and to the point.`,
      `Include all key points and do not add new information.`,
      `Respond only with the summary.`,
      `text to summarize:`,
      `${textChunk}`,
      `summary:`,
    ].join("\n");

    const summary = await this.lollms.generateText(
      summaryPrompt,
      host_address,
      model_name,
      -1, // personality
      maxGenerationSize, // n_predict
      false, // stream
      temperature, // temperature
      undefined, // top_k, using undefined to fallback on LollmsClient's default
      undefined, // top_p, using undefined to fallback on LollmsClient's default
      undefined, // repeat_penalty, using undefined to fallback on LollmsClient's default
      undefined, // repeat_last_n, using undefined to fallback on LollmsClient's default
      undefined, // seed, using undefined to fallback on LollmsClient's default
      undefined, // n_threads, using undefined to fallback on LollmsClient's default
      undefined // service_key, using undefined to fallback on LollmsClient's default
    );

    return summary;
  }  
}
