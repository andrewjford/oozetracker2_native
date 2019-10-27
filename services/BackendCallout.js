import React from "react";

export default class BackendCallout extends React.Component {
  static getFromApi = async (url, token) => {
    const response = await fetch(url, {
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

  static postToApi = async (url, { body, token, headers }) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(headers ? headers : {})
      },
      body: JSON.stringify(body)
    });

    try {
      const responseBody = await response.json();
      if (response.status < 200 || response.status > 299) {
        throw { jsonError: body.message };
      }
      return responseBody;

    } catch(error) {
      if (error.jsonError) {
        throw Error(error.jsonError);
      } else {
        throw Error("Bad/No response from server");
      }
    }
  };

  static putToApi = async (url, body, token) => {
    const response = await fetch(url, {
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

  static delete = async (url, token) => {
    const response = await fetch(url, {
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
}
