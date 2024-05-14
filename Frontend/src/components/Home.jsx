import { useEffect, useState } from "react";
// import Form from "./Form";

// const [updataData, setUpdataData] = useState(null);
const handelEdit = (item) => {
  const title = (document.getElementById("title").value = `${item.title}`);
  const description = (document.getElementById(
    "description"
  ).value = `${item.description}`);
  const button = (document.getElementById("button").innerHTML = "Update");
};

const Home = () => {
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

  const [appData, setAppData] = useState([]);

  const fetchData = () => {
    fetch("http://127.0.0.1:4000/api/v1/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
        setAppData(data.data);
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch initial data when the component mounts
    // Set up polling to fetch data at regular intervals
    const intervalId = setInterval(fetchData, 500); // Fetch data every 5 seconds
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // DELETE

  const handelDelete = async (del_id) => {
    fetch(`http://127.0.0.1:4000/api/v1//remove/${del_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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
      .then(() => {
        setAppData(appData.filter((item) => item._id !== del_id));
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };

  return (
    <div>
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
            id="button"
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2"
          >
            Create
          </button>
        </form>
      </div>

      {appData.map((item) => (
        <>
          <div className="bg-gray-100 m-auto mt-5 p-4 w-[1000px] rounded shadow-md justify-center items-center">
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>
            <div className="flex justify-between mt-5">
              <button
                onClick={() => handelEdit(item)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
              >
                Edit
              </button>

              <button
                onClick={() => handelDelete(item._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Home;
