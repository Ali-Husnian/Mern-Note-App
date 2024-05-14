const Form = () => {
  const handelSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const note = {
      title,
      description,
    };
    // console.log(note);
    fetch("http://127.0.0.1:4000/api/v1/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
      })
      .then((data) => {
        console.log(data);
        e.target.reset();
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };

  return (
    <>
      <h1 className="text-center mb-5 text-blue-600 font-bold">Note App</h1>
      <div className="flex justify-center items-center ">
        <form
          onSubmit={handelSubmit}
          className="w-1/2 bg-gray-100 p-8 rounded shadow-md"
        >
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            // value={item.description}
            type="text"
            name="title"
            id="title"
            className="w-full border rounded-md p-2 mb-4"
          />

          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <input
            // value={item.description}
            type="text"
            name="description"
            id="description"
            className="w-full border rounded-md p-2 mb-4"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
