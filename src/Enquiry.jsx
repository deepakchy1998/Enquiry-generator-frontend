import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import HomePageage from "./HomePage";

import EnquiryList from "./EnquiryList";
import axios from "axios";

function Enquiry() {
  // State to hold the list of enquiries
  const [enquiryList, setEnquiryList] = useState([]);
  // Function to fetch all enquiries from the server
  const getAllEnquiries = () => {
    axios
      .get("http://localhost:3000/api/web/enquiry/enquiries")
      .then((response) => {
        console.log("Enquiries fetched successfully:", response.data);
        setEnquiryList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching enquiries:", error);
      });
  };
  // Call getAllEnquiries when the component mounts
  useEffect(() => {
    getAllEnquiries();
  }, []);
  
  // State to hold the form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  // Function to handle input changes
  const getValue = (e) => {
    // Get the name and value of the input field that triggered the event
    // const inputName = e.target.name;
    // const inputValue = e.target.value;
    // const oldData = {...formData};
    // oldData[inputName] = inputValue;
    // setFormData(oldData);

    // Alternatively, you can use the following shorthand syntax
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    const { _id, ...payload } = formData;

    if (_id) {
      // Send formData to the server using axios PUT request
      axios
        .put(
          `http://localhost:3000/api/web/enquiry/edit/${_id}`,
          payload
        )
        .then((response) => {
          console.log("Form data updated successfully:", response.data);
          toast.success("Enquiry updated successfully!");
          getAllEnquiries();
        })
        .catch((error) => {
          console.error("Error updating form data:", error);
        });
      // Clear the formData state
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } else {
      // Send formData to the server using axios POST request
      axios
        .post("http://localhost:3000/api/web/enquiry/insert", formData)
        .then((response) => {
          console.log("Form data submitted successfully:", response.data);
          toast.success("Enquiry submitted successfully!"); 
          getAllEnquiries();
        })
        .catch((error) => {
          console.error("Error submitting form data:", error);
        });

      // Reset the form after submission
      // e.target.reset();

      // Clear the formData state
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }
    // Handle form submission logic here
    // For example, you can access form data using e.target.elements
    // const formData = {
    //   name: e.target.name.value,
    //   email: e.target.email.value,
    //   phone: e.target.phone.value,
    //   message: e.target.message.value,
    // }
  };

  return (
    <>
      <HomePageage />
      <ToastContainer />
      <div className="grid grid-cols-[30%_auto] gap-6 px-20">
        <div className="bg-gray-200 p-4">
          <h2 className="text-[20px] font-bold">Enquiry Form</h2>
          <form className="" action="" onSubmit={handleSubmit}>
            <div className="py-3">
              <Label htmlFor="name">Your Name</Label>
              <TextInput
                type="text"
                onChange={getValue}
                value={formData.name}
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="email1">Your Email</Label>
              <TextInput
                type="email"
                onChange={getValue}
                value={formData.email}
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="phone">Your Phone</Label>
              <TextInput
                type="text"
                onChange={getValue}
                value={formData.phone}
                name="phone"
                placeholder="Enter your Phone"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                placeholder="Leave a message..."
                onChange={getValue}
                value={formData.message}
                name="message"
                required
                rows={4}
              />
            </div>
            <div className="py-3">
              <Button type="submit" className="bg-green-800 w-full">
                {formData._id ? "Update Enquiry" : "Submit Enquiry"}
              </Button>
            </div>
          </form>
        </div>

        <EnquiryList
          data={enquiryList}
          getAllEnquiries={getAllEnquiries}
          setFormData={setFormData}
        />
      </div>
    </>
  );
}

export default Enquiry;
