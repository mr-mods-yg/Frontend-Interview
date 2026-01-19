import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

function CreateBlog() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center py-16 gap-2 text-center">
        <p className="text-2xl md:text-5xl font-bold">Create Blog</p>
        <p className="text-base sm:text-lg md:text-2xl opacity-70">You can create a blog by submitting the form below.</p>
      </div>
      <div className="w-9/10 md:w-1/2 flex flex-col justify-center">
        <InputGroup>
          <InputGroupText className="font-semibold pl-2 min-w-30">Title</InputGroupText>
          <InputGroupInput placeholder="Enter Blog Title..." />
        </InputGroup>
        <InputGroup>
          <InputGroupText className="font-semibold pl-2 min-w-30">Description</InputGroupText>
          <InputGroupTextarea rows={4} placeholder="Blog Description..." />
        </InputGroup>
        <InputGroup>
          <InputGroupText className="font-semibold pl-2 min-w-30">Category</InputGroupText>
          <InputGroupInput placeholder="Blog Category..." />
        </InputGroup>
        <InputGroup>
          <InputGroupText className="font-semibold pl-2 min-w-30">Cover Image</InputGroupText>
          <InputGroupInput placeholder="Cover Image URL" />
        </InputGroup>
        <InputGroup>
          <InputGroupText className="font-semibold pl-2 min-w-30">Blog Content</InputGroupText>
          <InputGroupTextarea rows={8} placeholder="Blog Content..." />
        </InputGroup>
        <Button variant={"outline"}>Submit</Button>
      </div>
    </div>
  )
}

export default CreateBlog
