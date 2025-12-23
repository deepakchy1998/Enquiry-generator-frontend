import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
  
import { ToastContainer, toast } from "react-toastify";

const EnquiryList = ({ data, getAllEnquiries, setFormData }) => {

  // Function to handle deleting an enquiry
  const deleteData = (delid) => {
    axios.delete(`http://localhost:3000/api/web/enquiry/delete/${delid}`)
      .then((response) => {
        console.log("Enquiry deleted successfully:", response.data);  
        toast.success("Enquiry deleted successfully!");
        getAllEnquiries();
      })
      .catch((error) => {
        console.error("Error deleting enquiry:", error);
        toast.error("Error deleting enquiry.");
      });
  };

  // Function to handle editing an enquiry
  const editData = (editid) => {
    axios.put(`http://localhost:3000/api/web/enquiry/edit/${editid}`)
    .then((response) => {
      setFormData(response.data);
      console.log("Enquiry edited successfully:", response.data);
      getAllEnquiries();      
    })
    .catch((error) => {
      console.error("Error editing enquiry:", error);
      toast.error("Error editing enquiry.");
    });
  };

  return (
    <>
      <div className="bg-gray-200 p-4">
      <ToastContainer />
        <h2 className="text-[20px] font-bold">Enquiry List</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>Sr No</TableHeadCell>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Phone</TableHeadCell>
                <TableHeadCell>Message</TableHeadCell>

                <TableHeadCell>
                  <span className="">Edit</span>
                </TableHeadCell>
                <TableHeadCell>
                  <span className="">Delete</span>
                </TableHeadCell>
              </TableRow>
            </TableHead>
            {data && data.length > 0 ? (
              <TableBody className="divide-y">
                {data.map((enquiry, index) => (
                  <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </TableCell>
                    <TableCell>{enquiry.name}</TableCell>
                    <TableCell>{enquiry.email}</TableCell>
                    <TableCell>{enquiry.phone}</TableCell>
                    <TableCell>{enquiry.message}</TableCell>
                    <TableCell>
                      <a
                        href="#" onClick={() => editData(enquiry._id)}
                        className="inline-flex items-center px-3 py-1.5 rounded-md font-semibold text-sm
             text-white bg-blue-600 hover:bg-blue-700
             dark:bg-blue-500 dark:hover:bg-blue-600
             transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        Edit
                      </a>
                    </TableCell>
                    <TableCell>
                      <a
                        href="#" onClick={() => deleteData(enquiry._id)}
                        className="inline-flex items-center px-3 py-1.5 rounded-md font-semibold text-sm
             text-white bg-red-600 hover:bg-red-700
             dark:bg-red-500 dark:hover:bg-red-600
             transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        Delete
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell colSpan={7} className="text-center py-4">
                    No data available
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
            {/* <TableBody className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                   1
                  </TableCell>
                  <TableCell>Mohan</TableCell>
                  <TableCell>mkc@gmail.com</TableCell>
                  <TableCell>8789914755</TableCell>
                  <TableCell>I have a query regarding your services.</TableCell>
                  <TableCell>
                    <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Edit
                    </a>
                  </TableCell>
                  <TableCell>
                    <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Delete
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody> */}
          </Table>
        </div>
      </div>
    </>
  );
};

export default EnquiryList;
