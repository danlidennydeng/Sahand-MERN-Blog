import {
  Select,
  Textarea,
  Button,
  Alert,
  Modal,
  ModalBody,
  FileInput,
} from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { app } from "../firebase.js";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image.");
        return;
      }
      setImageUploadError(null);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed.");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed.");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Publish your political post...
      </h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row"></div>
        {/* <TextInput
          type="text"
          placeholder="Title"
          required
          id="title"
          className="flex-1"
        /> */}

        <Textarea
          id="post"
          placeholder="Required. Instead of a short title, please summarize your long article here...minimum 20, maximum 280 charators"
          required
          rows={6}
        />
        <Select id="category" required>
          {/* <option value="unscope">Select a category</option> */}
          <option value="state">Statewide Issues</option>
          <option value="nation">Nationwide Issues</option>
          {/* <option value="state" disable={true}>
            Citywide Issues
          </option>
          <option value="state">Countywide Issues</option> */}
        </Select>

        <div className="flex gap-4 item-center justify-between border-4 border-purple-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-red-500"
            outline
            onClick={handleUploadImage}
            disable={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 mb-12 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Not required. Your long editorial here..."
          className="h-72 mb-12"
        />

        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-red-500"
          outline
        >
          Publish
        </Button>
      </form>
    </div>
  );
}
