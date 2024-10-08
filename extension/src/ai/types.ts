interface IOpenAIResponse {
  choices: [
    {
      message: {
        content: string;
      };
    }
  ];
}
