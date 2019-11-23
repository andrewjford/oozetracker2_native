export const getFromApi = async (url: string, token: string): Promise<any> => {
  const response: Response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  try {
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  } catch (error) {
    throw Error("Bad/No response from server");
  }
};

export const postToApi = async (
  url: string,
  { body, token, headers }: ApiFetchOptions
): Promise<any> => {
  const response: Response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(headers ? headers : {})
    },
    body: JSON.stringify(body)
  });

  if (response.status < 200 || response.status > 299) {
    const responseBody = await response.json();
    throw Error(JSON.stringify(responseBody.message));
  }
  return response.json();
};

export const putToApi = async (
  url: string,
  body: any,
  token: string
): Promise<any> => {
  const response: Response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  const jsonResponse = await response.json();
  if (response.status < 200 || response.status > 299) {
    throw new Error(JSON.stringify(jsonResponse.message));
  }
  return jsonResponse;
};

export const deleteFromApi = async (
  url: string,
  token: string
): Promise<any> => {
  const response: any = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status !== 204) {
    throw Error(`Error: ${response.message}`);
  }
  return "success";
};
