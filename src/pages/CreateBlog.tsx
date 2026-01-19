import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CircleCheckBig } from "lucide-react";
import { useState, type KeyboardEvent } from "react"

type FormData = {
  title: string;
  description: string;
  category?: string[];
  coverImage: string;
  content: string;
}
type ErrorData = {
  title?: string;
  description?: string;
  category?: string;
  coverImage?: string;
  content?: string;
}
const defaultErrorState = {
  title: "",
  description: "",
  category: "",
  coverImage: "",
  content: ""
}

function CreateBlog() {
  const queryClient = useQueryClient();
  const [categories, setCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    coverImage: "",
    content: ""
  });
  const [error, setError] = useState<ErrorData>(defaultErrorState);
  const [categoryInput, setCategoryInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitForm = async ({ title, description, category, content, coverImage }: FormData) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/blogs`, {
      title: title.trim(),
      description: description.trim(),
      category: category,
      content: content.trim(),
      coverImage: coverImage.trim(),
      date: new Date().toISOString()
    })
    return response
  }
  const blogMutation = useMutation({
    mutationFn: submitForm,
    onSuccess: () => {
      setSubmitted(true);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const addCategory = (value: string) => {
    const tag = value.trim();
    if (!tag || categories.includes(tag)) return;
    setCategories([...categories, tag]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      addCategory(categoryInput);
      setCategoryInput("");
    }

    if (e.key === "Backspace" && categoryInput === "" && categories.length) {
      setCategories(categories.slice(0, -1));
    }
  };

  const handleSubmit = async () => {
    console.log("form submitted");

    const errors: ErrorData = { ...defaultErrorState };

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    const coverImgUrl = formData.coverImage.trim();
    if (!coverImgUrl) {
      errors.coverImage = "Cover image is required";
    }
    else if (!coverImgUrl.startsWith("https://") && !coverImgUrl.startsWith("http://")) {
      errors.coverImage = "Invalid URL";
    }

    if (!formData.content.trim()) {
      errors.content = "Content is required";
    }

    if (Object.values(errors).some(Boolean)) {
      setError(errors);
      return;
    }

    setError(defaultErrorState); // remove error logs if everything seems fine.
    // submit the form
    blogMutation.mutate({
      title: formData.title,
      description: formData.description,
      category: categories,
      content: formData.content,
      coverImage: formData.coverImage
    })

  };

  return (
    <div className="flex flex-col items-center pb-16">
      <div className="flex flex-col items-center py-16 gap-2 text-center">
        <p className="text-2xl md:text-5xl font-bold">Create Blog</p>
        <p className="text-base sm:text-lg md:text-2xl opacity-70">You can create a blog by submitting the form below.</p>
      </div>
      <div className="w-9/10 md:w-1/2 flex flex-col justify-center">
        {submitted && <p className="px-2 py-2 bg-green-300 text-green-600 flex gap-1 items-center rounded-sm">Your blog has been submitted <CircleCheckBig size={18} /></p>}
        <InputGroup>
          <InputGroupText className="font-semibold pl-2 min-w-30">Title</InputGroupText>
          <InputGroupInput value={formData.title} onChange={(e) => {
            setFormData((prev) => { return { ...prev, title: e.target.value } })
          }}
            placeholder="Enter Blog Title..." />
        </InputGroup>
        <p className="px-2 text-red-500">{error.title != "" && error.title}</p>
        <InputGroup>
          <InputGroupText className="font-semibold pl-2 min-w-30">Description</InputGroupText>
          <InputGroupTextarea rows={4} value={formData.description} onChange={(e) => {
            setFormData((prev) => { return { ...prev, description: e.target.value } })
          }} placeholder="Blog Description..." />
        </InputGroup>
        <p className="px-2 text-red-500">{error.description != "" && error.description}</p>

        <InputGroup>
          <InputGroupText className="font-semibold pl-2 min-w-30">Category</InputGroupText>
          <InputGroupText className="font-semibold flex gap-1">{categories.map((item) => <span className="border rounded-md px-1">{item}</span>)}</InputGroupText>
          <InputGroupInput value={categoryInput} onChange={(e) => {
            setCategoryInput(e.target.value.toUpperCase())
          }} placeholder="Blog Categories (UPPERCASE, separated by commas)" onKeyDown={handleKeyDown} />
        </InputGroup>
        <p className="px-2 text-red-500">{error.category != "" && error.category}</p>

        <InputGroup>
          <InputGroupText className="font-semibold pl-2 min-w-30">Cover Image</InputGroupText>
          <InputGroupInput value={formData.coverImage} onChange={(e) => {
            setFormData((prev) => { return { ...prev, coverImage: e.target.value } })
          }} placeholder="Cover Image URL" />
        </InputGroup>
        <p className="px-2 text-red-500">{error.coverImage != "" && error.coverImage}</p>

        <InputGroup>
          <InputGroupText className="font-semibold pl-2 min-w-30">Blog Content</InputGroupText>
          <InputGroupTextarea value={formData.content} onChange={(e) => {
            setFormData((prev) => { return { ...prev, content: e.target.value } })
          }} rows={8} placeholder="Blog Content..." />
        </InputGroup>
        <p className="px-2 text-red-500">{error.content != "" && error.content}</p>

        <Button variant={"outline"} onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}



export default CreateBlog
