
import { useForm } from "react-hook-form";
import TextInputField from "../../Componants/Shared/TextInputField";
import { Button, Textarea } from "@material-tailwind/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
  quantity: yup.number().required("Quantity is required"),
  category: yup.string().required("Category is required"),
  image: yup.string().required("Image is required"),
});

export default function AddCyble() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    const promise = fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          reset();
        }
      });

    toast.promise(promise, {
      loading: "Uploading...",
      success: "Uploaded",
      error: "Something went wrong",
    });

    console.log({ promise });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Rent Post</h1>
      <div className="bg-white rounded-lg w-6/12">
        <form className="p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextInputField
              register={register}
              errors={errors}
              name="title"
              label="Product Title"
              type="text"
              size="lg"
            />
          </div>
          <div>
            <Textarea
              label="Product Description"
              {...register("description")}
            />
            {errors.description && (
              <small className="text-red-500">
                {errors.description?.message}
              </small>
            )}
          </div>
          <div className="w-full">
              <TextInputField
                register={register}
                errors={errors}
                name="quantity"
                label="Location"
                type="text"
                size="lg"
                min="0"
              />
            </div>
          <div className="flex gap-6">
            <div className="w-full">
              <TextInputField
                register={register}
                errors={errors}
                name="price"
                label="Rent"
                type="number"
                size="lg"
                min="0"
              />
            </div>
            <div className="w-full">
              <TextInputField
                register={register}
                errors={errors}
                name="quantity"
                label="Available Time"
                type="time"
                size="lg"
                min="0"
              />
            </div>
          </div>
          <div>
            <div className="w-full">
              <select
                {...register("category")}
                className="px-3 py-2 rounded-md border border-gray-400 w-full"
              >
                <option value="Available">Available</option>
                <option value="On Rent">On Rent</option>
                <option value="Unavailable">Unavailable</option>
              </select>
              {errors.category && (
                <small className="text-red-500">
                  {errors.category?.message}
                </small>
              )}
            </div>
          </div>
          <div>
            <TextInputField
              register={register}
              errors={errors}
              name="image"
              label="Product Image URL"
              type="text"
              size="lg"
            />
          </div>
          <div>
            <Button type="submit">Post</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
