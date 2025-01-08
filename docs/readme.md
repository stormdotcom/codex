```markdown
# **Code X - Developer Documentation**
![Codex](./assets/logo.png)
This documentation provides detailed guidance for developers to contribute to and enhance the Code X VS Code extension. It covers the project structure, development setup, key components, and best practices for extending the functionality of Code X.

---

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Codebase Structure](#codebase-structure)
4. [Development Workflow](#development-workflow)
5. [Configuration](#configuration)
6. [API Integration](#api-integration)
7. [Testing and Debugging](#testing-and-debugging)
8. [Packaging and Publishing](#packaging-and-publishing)
9. [Contributing](#contributing)
10. [FAQs](#faqs)

---

## **1. Project Overview**

Code X is designed to:

- Provide real-time, AI-powered code suggestions and inline completions.
- Integrate seamlessly with popular platforms and APIs like OpenAI, OpenRouter, and Stack Overflow.
- Serve as an extensible framework for developers to add new features and integrations.

---

## **2. Getting Started**

### **Prerequisites**

- **Node.js**: v14.x or later  
- **npm**: v6.x or later  
- **VS Code**: v1.34.0 or later  

### **Clone the Repository**
```bash
git clone https://github.com/stormdotcom/codexe.git
cd codexe
```

### **Install Dependencies**
```bash
npm install
```

### **Build the Project**
```bash
npm run build
```

### **Run the Extension**
1. Open the project folder in VS Code.
2. Press `F5` to start debugging.
3. A new VS Code instance with Code X loaded will open.

---

## **3. Codebase Structure**

The project is structured as follows:

```plaintext
codexe/
├── src/                     # Source code for the extension
│   ├── extension.ts         # Main entry point for the extension
│   ├── utils/               # Helper functions and utilities
│   │   ├── fetchPageContent.ts
│   │   ├── matchSearchPhrase.ts
│   │   └── search.ts
│   ├── config.ts            # Configuration and settings
│   └── extractors/          # Platform-specific extractors (e.g., StackOverflow, GitHub)
├── out/                     # Compiled output
├── assets/                  # Icons and other static assets
├── package.json             # Extension metadata and dependencies
├── webpack.config.js        # Webpack configuration for bundling
└── tsconfig.json            # TypeScript configuration
```

---

## **4. Development Workflow**

### **Key Commands**

- **Build the Project**: `npm run build`  
- **Start Watching for Changes**: `npm run watch`  
- **Lint the Code**: `npm run lint`  

### **Debugging the Extension**
- Press `F5` in VS Code to start debugging.
- Use `console.log()` for debugging messages, which will appear in the Debug Console.

---

## **5. Configuration**

Settings for the extension are defined in the `package.json` file under the `contributes.configuration` section.

### **Example Settings**
```json
{
  "codeX.settings.OpenAI.apiKey": "your-openai-api-key",
  "codeX.settings.OpenAI.model": "gpt-4",
  "codeX.settings.ai.temperature": 0.5,
  "codeX.settings.maxResults": 10
}
```

### **Adding New Settings**
1. Update the `contributes.configuration` section in `package.json`.
2. Access the settings in your code using:
   ```typescript
   const config = vscode.workspace.getConfiguration("codeX.settings");
   const apiKey = config.get<string>("OpenAI.apiKey");
   ```

---

## **6. API Integration**

### **OpenAI Integration**
1. **Set Up API Key**: Add your OpenAI API key in the settings (`codeX.settings.OpenAI.apiKey`).
2. **API Call Example**:
   ```typescript
   const response = await axios.post("https://api.openai.com/v1/chat/completions", {
     model: "gpt-4",
     messages: [{ role: "user", content: "Generate a Python function to sort a list." }]
   }, {
     headers: { Authorization: `Bearer ${apiKey}` }
   });
   ```

### **Adding a New API**
1. Create a helper function in `src/utils/` to handle API calls.
2. Add a new setting in `package.json` for the API key or endpoint.
3. Update `extension.ts` to handle requests for the new API.

---

## **7. Testing and Debugging**

### **Unit Tests**
- **Framework**: Jest  
- **Run Tests**:
  ```bash
  npm run test
  ```
- Add tests in the `__tests__/` directory.

### **Debugging Tips**
- Use the Debug Console in VS Code to monitor logs.
- Validate settings by printing them:
  ```typescript
  console.log(vscode.workspace.getConfiguration("codeX.settings"));
  ```

---

## **8. Packaging and Publishing**

### **Package the Extension**

1. Build the project:
   ```bash
   npm run build
   ```

2. Create a `.vsix` file:
   ```bash
   npx vsce package
   ```

### **Publish to the VS Code Marketplace**

1. Log in to your Microsoft account using the `vsce` CLI:
   ```bash
   npx vsce login <publisher-name>
   ```

2. Publish the extension:
   ```bash
   npx vsce publish
   ```

---

## **9. Contributing**

We welcome contributions! Here's how you can help:

1. Fork the repository and create a new branch.
2. Make your changes and add tests where applicable.
3. Submit a pull request with a detailed description of your changes.

### **Coding Guidelines**
- Follow the existing code style enforced by ESLint.
- Use TypeScript for type safety and consistency.
- Write meaningful commit messages.

---

## **10. FAQs**

### Q: How do I change the default AI model?
- Go to your VS Code settings and update the `codeX.settings.OpenAI.model` value.

### Q: What should I do if I encounter a network error?
- Verify your API key and internet connection. Use the Debug Console to check error logs.

### Q: Can I add support for a new API?
- Yes, refer to the [API Integration](#api-integration) section for detailed instructions.

---

For more details, visit the [GitHub repository](https://github.com/stormdotcom/codex). If you have questions or feature requests, open an issue or start a discussion!
```