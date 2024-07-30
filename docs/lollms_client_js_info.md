# JavaScript File Information

# Classes

## LollmsClient
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
      default_generation_mode = ELF_GENERATION_FORMAT.LOLLMS)
  updateServerAddress(newAddress)
  tokenize(prompt)
  encode(prompt)
  decode(tokensList)
  async lollms_generate(prompt, this.host_address, this.model_name, -1, n_predict, stream, temperature, top_k, top_p, repeat_penalty, repeat_last_n, seed, n_threads, service_key, streamingCallback)
  async lollms_generate(prompt, host_address = this.host_address, model_name = this.model_name, personality = this.personality, n_predict = this.n_predict, stream = false, temperature = this.temperature, top_k = this.top_k, top_p = this.top_p, repeat_penalty = this.repeat_penalty, repeat_last_n = this.repeat_last_n, seed = this.seed, n_threads = this.n_threads, service_key = this.service_key, streamingCallback = null)


  
  async openai_generate(prompt, host_address = this.host_address, model_name = this.model_name, personality = this.personality, n_predict = this.n_predict, stream = false, temperature = this.temperature, top_k = this.top_k, top_p = this.top_p, repeat_penalty = this.repeat_penalty, repeat_last_n = this.repeat_last_n, seed = this.seed, n_threads = this.n_threads, ELF_COMPLETION_FORMAT = "vllm instruct", service_key = this.service_key, streamingCallback = null)
  async listMountedPersonalities(host_address = this.host_address)
  async listModels(host_address = this.host_address)

### TasksLibrary

Methods:
constructor(lollms)
async translateTextChunk(textChunk, outputLanguage = "french", host_address = null, model_name = null, temperature = 0.1, maxGenerationSize = 3000)
async summarizeText(textChunk, summaryLength = "short", host_address = null, model_name = null, temperature = 0.1, maxGenerationSize = 1000)

