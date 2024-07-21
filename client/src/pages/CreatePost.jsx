import {
  TextInput,
  Select,
  Textarea,
  Button,
  Alert,
  Modal,
  ModalBody,
  FileInput,
} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
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
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-red-500"
            outline
          >
            Upload image
          </Button>
        </div>

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
