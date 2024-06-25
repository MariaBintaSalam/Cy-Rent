import React from "react";
import { useForm } from "react-hook-form";
import { Button, Textarea } from "@material-tailwind/react";
import TextInputField from "../Shared/TextInputField";

export default function Search() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Search Cycle</h1>
      <div className="bg-white rounded-lg w-6/12">
        <form className="p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>

          <div className="flex gap-6">
          <div className="w-full">
              <select
                {...register("category", { required: "Category is required" })}
                className="px-3 py-2 rounded-md border border-gray-400 w-full"
              >
                <option value="#">Select District</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Noakhali">Noakhali</option>
              </select>
              {errors.category && (
                <small className="text-red-500">{errors.category.message}</small>
              )}
            </div>

            <div className="w-full">
              <TextInputField
                register={register}
                errors={errors}
                name="city"
                label="City"
                type="text"
                size="lg"
                min="0"
              />
            </div>
            <div>
            <Button type="submit">Search</Button>
          </div>
           
          </div>
        </form>
      </div>
    </div>
  );
}
