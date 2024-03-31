# lollms_client_js

A client library for interacting with the LoLLMs (Lord Of Large Language Models) server. This library allows you to generate text using various parameters and configurations.

## Installation

You can install this library using npm:

```
npm install lollms_client_js
```

## Usage

Import the `generateText` function from the library:

```javascript
import { generateText } from 'lollms_client_js';
```

Then, you can call the `generateText` function with the desired parameters:

```javascript
const prompt = "Once upon a time";
const generatedText = await generateText(prompt);
console.log(generatedText);
```

### Parameters

The `generateText` function accepts the following parameters:

- `prompt` (string, required): The input text prompt for text generation.
- `host` (string, optional, default: "http://localhost:9600"): The host URL of the LoLLMs server.
- `model_name` (string, optional): The name of the model to use for text generation.
- `personality` (number, optional, default: -1): The personality index for the model.
- `n_predict` (number, optional, default: 1024): The maximum number of tokens to generate.
- `stream` (boolean, optional, default: false): Whether to stream the generated text or not.
- `temperature` (number, optional, default: 1.0): The sampling temperature for text generation.
- `top_k` (number, optional, default: 50): The top-k sampling parameter for text generation.
- `top_p` (number, optional, default: 0.95): The top-p sampling parameter for text generation.
- `repeat_penalty` (number, optional, default: 0.8): The repeat penalty for text generation.
- `repeat_last_n` (number, optional, default: 40): The number of tokens to consider for repeat penalty.
- `seed` (number, optional): The random seed for text generation.
- `n_threads` (number, optional, default: 8): The number of threads to use for text generation.

## Example

Here's an example of how to use the `generateText` function:

```javascript
import { generateText } from 'lollms_client_js';

const prompt = "Once upon a time";
const generatedText = await generateText(prompt, {
  model_name: "my_custom_model",
  personality: 3,
  temperature: 0.7,
  top_k: 30,
});
console.log(generatedText);
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/ParisNeo/lollms_client_js).

## License

This project is licensed under the [Apache-2.0 License](LICENSE).

**Note**: Please ensure that the `lollms` server is configured to accept CORS requests from the server serving the `lollms_client_js` client. To do this, in the `lollms` personal folder on the server, find `configs/local_configs.yaml` and add the host address to `allowed_origins`. For example, if the origin is `https://mydomain.com:95620`, add it there. This is important to avoid access issues.
