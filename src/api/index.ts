const figmaRestApi = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = process.env.FIGMA_BASE_URL;
  const headers = {
    "X-Figma-Token": process.env.DEV_ACCESS_TOKEN,
    ...options.headers,
  };

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export default figmaRestApi;
