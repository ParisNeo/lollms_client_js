# 🚀 Introducing lollms\_client\_js: The Ultimate Tool for Interacting with Large Language Models! 🤖

[![npm installs](https://img.shields.io/npm/dw/lollms_client_js)](https://www.npmjs.com/package/lollms_client_js) [![npm version](https://img.shields.io/npm/v/lollms_client_js)](https://www.npmjs.com/package/lollms_client_js) [![GitHub license](https://img.shields.io/github/license/ParisNeo/lollms_client_js)](LICENSE)

Ever wished you could unleash the power of large language models with just a few lines of code? Look no further! With our new `lollms_client_js` library, you can easily generate text using various parameters and configurations. Intrigued? Let's dive in!

See it in action: [![Demo](https://img.shields.io/badge/Demo-Online-green.svg)](https://YOUR_DEMO_LINK)

## 🚀 Installation

Get started by installing the library with npm:

```bash
npm install lollms_client_js
```

## 📝 Usage

Import the `generateText` function from the library and begin generating text with the desired parameters:

```javascript
import { generateText } from 'lollms_client_js';

// Prompt
const prompt = "Once upon a time";
const generatedText = await generateText(prompt);
console.log(generatedText);
```

## 📚 Parameters

The `generateText` function supports the following parameters:

- `prompt` (string, required): Initial input text prompt for text generation
- `host` (string, optional, default: "http://localhost:9600"): Host URL of the lollms server
- `model_name` (string, optional): Name of the model to use for text generation
- `personality` (number, optional, default: -1): Personality index for the model
- `n_predict` (number, optional, default: 1024): Maximum number of tokens to generate
- `stream` (boolean, optional, default: true): Stream generated text or not
- `temperature` (number, optional, default: 1.0): Sampling temperature for text generation
- `top_k` (number, optional, default: 50): Top-k sampling parameter for text generation
- `top_p` (number, optional, default: 0.95): Top-p sampling parameter for text generation
- `repeat_penalty` (number, optional, default: 0.8): Repeat penalty for text generation
- `repeat_last_n` (number, optional, default: 40): Number of tokens to consider for repeat penalty
- `seed` (number, optional): Random seed for text generation
- `n_threads` (number, optional, default: 8): Number of threads to use for text generation

## 💻 Example

Check out and adapt the example below for a seamless start:

```javascript
import { generateText } from 'lollms_client_js';

// Prompt
const prompt = "Once upon a time";

// Custom Configuration
const configurations = {
  model_name: 'myModel',
  personality: 1,
  n_predict: 256,
  temperature: 0.85,
  top_k: 20,
  repeat_penalty: 0.7,
};

// Generate Text
const generatedText = await generateText(prompt, configurations);
console.log(generatedText);
```

## 🙌 Contributing

We welcome and appreciate your contributions! Share any issues or ideas you have in a new [issue](https://github.com/ParisNeo/lollms_client_js/issues/new/choose).

## 📄 License

This project is licensed under the [Apache-2.0 License](LICENSE).

## ⚠️ Important Note

Please make sure the [lollms](https://github.com/ParisNeo/lollms) server is configured to accept CORS requests from the server serving the `lollms_client_js` client. Add the host address to the `allowed_origins` list in the `configs/local_configs.yaml` file.

For example, if the origin is `https://mydomain.com:95620`, add it there. This step ensures a smooth lollms operation.

## More about me and my work

Hey there! I am ParisNeo, a seasoned research engineer with a deep passion for Artificial Intelligence, Robotics, and Space. I enjoy creating extraordinary AI models, so feel free to join me on my [Twitter @ParisNeo\_AI](https://twitter.com/ParisNeo_AI), [Discord](https://discord.gg/BDxacQmv), [Sub-Reddit](https://www.reddit.com/r/lollms/), and [Instagram @spacenerduino](https://www.instagram.com/spacenerduino/)
