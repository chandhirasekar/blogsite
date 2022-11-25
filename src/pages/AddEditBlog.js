import React from "react-dom";
import axios from "axios";
import { MDBInput, MDBBtn, MDBValidation } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
};
const options = ["sports", "fitness", "travel", "fashion", "food", "tech"];

///bwq4axty
function AddEditBlog() {
  const [formValue, setFormValue] = useState(initialState);
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { title, description, category, imageUrl } = formValue;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      getSingleBlog(id);
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
    if (singleBlog.status === 200) {
      setFormValue({ ...singleBlog.data });
    } else {
      toast.error("something went wrong");
    }
  };

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    return today;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryErrMsg("please select a category");
    }
    const imageValidation = !editMode ? imageUrl : true;

    if (title && description && imageUrl && category) {
      const currentDate = getDate();
      if (!editMode) {
        const updatedBlogData = { ...formValue, date: currentDate };
        const res = await axios.post(
          "http://localhost:5000/blogs",
          updatedBlogData
        );

        if (res.status === 201) {
          toast.success("blog upload successfully");
        } else {
          toast.error("something went wrong");
        }
      } else {
        const res = await axios.put(
          `http://localhost:5000/blogs/${id}`,
          formValue
        );

        if (res.status === 200) {
          toast.success("blog update successfully");
        } else {
          toast.error("something went wrong");
        }
      }

      setFormValue({
        title: " ",
        description: " ",
        category: " ",
        imageUrl: " ",
      });
      navigate("/");
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onUploadImages = (file) => {
    console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kh9jsa39");
    axios
      .post("http://api.cloudinary.com/v1_1/dwboq2j3m/image/upload", formData)
      .then((response) => {
        console.log("response....", response);
        toast.info("image uplaoded successfully...");
        setFormValue({ ...formValue, imageUrl: response.data.url });
      })
      .catch((err) => {
        toast.error("something went error...");
      });
  };
  const onChangeCategory = (e) => {
    setCategoryErrMsg(null);
    setFormValue({ ...formValue, category: e.target.value });
  };

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">{editMode ? "Update Blog" : "Add Blog"}</p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={title || ""}
          name="title"
          type="text"
          onChange={onInputChange}
          required
          label="title"
          validation=" please a provide a title"
          invalid
        />
        <br />
        <MDBInput
          value={description || ""}
          name="description"
          type="text"
          label="description"
          rows={4}
          onChange={onInputChange}
          required
          feedback="Please enter a message in the textarea."
          invalid
          validation=" please a provide a description"
          textarea
        />
        <br />
        {!editMode && (
          <>
            <MDBInput
              type="file"
              onChange={(e) => onUploadImages(e.target.files[0])}
              required
              validation=" please a provide a title"
              invalid
            />
            <br />
          </>
        )}

        <select
          className="categoryDropdown"
          onChange={onChangeCategory}
          value={category}
        >
          <option>please select category</option>
          {options.map((option, index) => (
            <option value={option || ""} Key={index}>
              {option}
            </option>
          ))}
        </select>
        {categoryErrMsg && (
          <div className="categoryError">{categoryErrMsg}</div>
        )}
        <br />
        <br />
        <MDBBtn type="sumbit" style={{ marginRight: "10px" }}>
          {editMode ? " Update " : "Add"}
        </MDBBtn>
        <MDBBtn
          color="danger"
          style={{ marginRight: "10px" }}
          onClick={() => navigate("/")}
        >
          go back
        </MDBBtn>
      </div>
    </MDBValidation>
  );
}

export default AddEditBlog;
