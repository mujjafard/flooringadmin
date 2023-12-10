import React, { useState } from "react";
import * as XLSX from 'xlsx';
import axios from 'axios';
import { toast } from "react-toastify";
function ProductBulkUpload() {
    const [excelFile, setExcelFile] = useState(null);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setExcelFile(file);
    };
    const handleUpload = async (e) => {
      e.preventDefault()
        if (!excelFile) {
          alert('Please select an Excel file');
          return;
        }
        try {
            const data = await promise;
            axios.post("http://localhost:5001/api/product/bulkUpload",data)
            .then((res) => {
              toast.success("Bulk Upload Succefully")
            }).catch((err)=>{
              toast.error("Bulk Upload Failed")
            })
           
            // Do something with the data, e.g., pass it to an API
          } catch (error) {
            console.error('Error:', error);
            // Handle the error, e.g., show an error message to the user
          }
       
      };
      

      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(excelFile);
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, { type: "buffer" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          resolve(data);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
      promise.then((data) => {
        console.log('Resolved Data:', data);
      }).catch((error) => {
        console.error('Error:', error);
      });
  
    //   promise
    //     .then((item) => {
    //       if (item.length > 0) {
    //         const keys = Object.keys(item[0]);
    //         let toProceed = false;
    //         productExcelFieldDelete.forEach((key, index) => {
    //           const find = keys.find((p) => p === key);
    //           if (!find) {
    //             toProceed = false;
    //           } else {
    //             toProceed = true;
    //           }
    //         });
    //         if (toProceed === true) {
    //           item.forEach((data, index) => {
    //             const find = allProducts.find(
    //               (product) => product.sku === data.SKU
    //             );
    //             console.log(index, find);
    //             if (find) {
    //               axios
    //                 .delete(
    //                   https://freedygoservices.in/api/product/delete/${find._id}
    //                 )
    //                 .then((res) => {
    //                   forceUpdate();
    //                   console.log(index, res.data);
    //                 });
    //             }
    //           });
    //           disableLoading(item.length > 100 ? item.length / 20 : 10);
    //         }
    //       }
        
    //       if (proceed) {
    //         setLoading(false);
    //       }
    //     })
    //     .catch((err) => console.log(err));


  return (
    <>
      <form
        action=""
        class="row g-3 pt-3 shadow p-3 mb-5"
        style={{ padding: 20, backgroundColor: "#f7f6ed" }}
      >
        <div className="row">
          <div class="col-md-4">
            <label for="inputEmail4" class="form-label txt-input">
              Choose File<span className="text-danger">*</span>
            </label>
            <input
              type="file"
              class="form-control"
              //   value={data.name}
              id="inputEmail4"
              //   onChange={(e) => {
              //     setData({ ...data, name: e.target.value });
              //     handleInput(e);
              //   }}
              onChange={handleFileChange}
            />
          </div>

          <div className="col-lg-12 mt-4">
            <button
              type=""
              class="btn btn-primary fw-bold shadow border-0 p-2"
              style={{ backgroundColor: "#e67929", width: 115 }}
              // onClick={(e) => {
              //   handleFormSubmit(e);
              // }}
              onClick={(e)=>handleUpload(e)}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ProductBulkUpload;
