import { defaultRequestData, getData } from "../src/main.js";

const form = document.getElementById("form");

const handleSubmit = (event) => {
  event.preventDefault();

  const data = getData(form);

  console.table(data);

  const requestData = {
    ...defaultRequestData,
    token: "abc123",
    data,
  };

  console.log(requestData);
};

form.addEventListener("submit", handleSubmit);
