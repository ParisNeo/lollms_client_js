# LoLLMs Client JS Detailed Guide

![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)
![npm version](https://badge.fury.io/js/lollms_client_js.svg)
![Build Status](https://travis-ci.com/ParisNeo/lollms_client_js.svg?branch=main)

Dive deeper into the capabilities of the LoLLMs Client JS library 🌌, crafted for developers by ParisNeo. This detailed guide will cover the methods provided by the library, including how to use them and their parameters, to empower your applications with cutting-edge AI text generation.

## Installation

Ensure you have Node.js installed, then add LoLLMs Client JS to your project:

```bash
npm install lollms_client_js
```

## Initialization

Start by importing and initializing the `LollmsClient`:

```javascript
const LollmsClient = require('lollms_client_js');

// Initialize the client with your LoLLMs host and the model name.
const client = new LollmsClient('http://your-lollms-host.com', 'modelName');
```

### Methods Overview

The `LollmsClient` provides several methods for interacting with the LoLLMs backend:

- `generateText()`
- `generate_completion()`
- `listMountedPersonalities()`
- `listModels()`

### `generateText(prompt, options)`

Generates text based on a given prompt and options.

**Parameters:**

- `prompt` (String): The input text to generate further content.
- `options` (Object): Optional parameters to customize the request. Includes:
  - `stream` (Boolean): Whether to stream the response.
  - `temperature` (Number): Controls randomness.
  - `topK` (Number): Filters the top K candidates before sampling.
  - `topP` (Number): Nucleus sampling.
  - `repeatPenalty` (Number): Penalty for repetition.
  - `repeatLastN` (Number): Number of tokens to check for repetition.
  - `seed` (Number): Random seed for reproducibility.
  - `nThreads` (Number): Number of threads to use.

**Example:**

```javascript
client.generateText("Hi there, how can I assist you today?", { temperature: 0.9 }).then(response => {
  console.log(response);
});
```

### `generate_completion(prompt, options)`

Generates a completion for a given prompt with detailed control over the generation process.

**Parameters:**

Similar to `generateText`, but with an additional `completionFormat` parameter to specify the format of the generated completion.

**Example:**

```javascript
client.generate_completion("The future of AI in robotics is", { temperature: 0.7, completionFormat: "vllm instruct" }).then(completion => {
  console.log(completion);
});
```

### `listMountedPersonalities()`

Lists all mounted personalities available on the LoLLMs server.

**Example:**

```javascript
client.listMountedPersonalities().then(personalities => {
  console.log(personalities);
});
```

### `listModels()`

Lists all models available for text generation on the LoLLMs server.

**Example:**

```javascript
client.listModels().then(models => {
  console.log(models);
});
```

## Contributing

Your contributions are welcome! Follow the steps below to contribute:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the Apache 2.0 License - see the `LICENSE` file for details.

## Contact

Reach out to ParisNeo for any questions or suggestions:

- Twitter: [@ParisNeo_AI](https://twitter.com/ParisNeo_AI)

Project Repository: [https://github.com/ParisNeo/lollms_client_js](https://github.com/ParisNeo/lollms_client_js)

Thank you for choosing LoLLMs Client JS for your project. Happy coding!

See ya 👋
```

This extended guide provides a closer look at the capabilities and usage of the `LollmsClient` methods, offering developers a clear understanding of how to leverage the library for their applications.