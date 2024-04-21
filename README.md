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


# TasksLibrary Documentation

The `TasksLibrary` is a JavaScript library designed to simplify and streamline the use of the LoLLMs (Lord Of Large Language Models) Client for common text processing tasks such as translation and summarization. This documentation provides an overview of the library's functionality and how to utilize it in your projects.

## Getting Started

To use the `TasksLibrary`, you first need an instance of the `LollmsClient`. This client is responsible for communicating with the LoLLMs service, sending prompts, and receiving generated text.

### Installation

Ensure you have the `LollmsClient` JavaScript class available in your project. The `TasksLibrary` class then needs to be included in your project:

```javascript
import { LollmsClient } from './path/to/lollms_client_js.js';
import { TasksLibrary } from './path/to/lollms_client_js.js';
```

### Initialization

Create an instance of the `LollmsClient` with your service configuration:

```javascript
const lollmsClient = new LollmsClient(
  'your_host_address',
  'your_model_name',
  // Other parameters as needed
);
```

Then, instantiate the `TasksLibrary` with the `LollmsClient` instance:

```javascript
const tasksLibrary = new TasksLibrary(lollmsClient);
```

## Features

The `TasksLibrary` currently supports the following features:

### Text Translation

Translate a chunk of text to a specified language without altering the original meaning or adding extraneous information.

#### Usage

```javascript
tasksLibrary.translateTextChunk(textChunk, outputLanguage)
  .then(translatedText => {
    console.log(translatedText);
  })
  .catch(error => {
    console.error(error);
  });
```

### Text Summarization

Summarize a given text chunk in a concise manner, ensuring all key points are covered without introducing new information.

#### Usage

```javascript
tasksLibrary.summarizeText(textChunk, summaryLength)
  .then(summary => {
    console.log(summary);
  })
  .catch(error => {
    console.error(error);
  });
```

## Parameters

- `textChunk`: The text to be processed.
- `outputLanguage`: (For translation) The target language for the translation.
- `summaryLength`: (For summarization) The desired length of the summary. Can be "short", "medium", or "long".
- `hostAddress`, `modelName`, `temperature`, `maxGenerationSize`: Additional parameters for customization and optimization of the task.

## Conclusion

The `TasksLibrary` is a powerful tool for developers working with text processing in the context of AI and robotics. By leveraging the capabilities of LoLLMs, it offers an easy and efficient way to perform complex tasks such as translation and summarization.

For more information and updates, follow the project's [GitHub repository](https://github.com/your-repo) or join our community on [Discord](https://discord.gg/BDxacQmv).

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