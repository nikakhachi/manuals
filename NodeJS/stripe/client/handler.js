const button = document.querySelector("button");
button.addEventListener("click", async () => {
  try {
    const { data } = await axios.post("http://localhost:5000/create-checkout-session", {
      items: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 1 },
      ],
    });
    window.location = data.url;
  } catch (error) {
    console.error(error.response.data.error);
  }
});
