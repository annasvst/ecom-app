"use client";
import { useForm } from "react-hook-form";
import {
  allCategories,
  Product,
  allAvailabilityStatuses,
  allReturnPolicies,
  AvailabilityStatus,
  ReturnPolicy,
  allTags,
  Tag,
} from "@/types/product";
import { useActionState } from "react";
import { AddNewProductAction } from "@/app/actions/admin/products";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import TagsCheckboxGroup from "@/components/common/TagsCheckboxGroup";

const initialState = {
  success: false,
  inputs: {},
  errors: {},
};

export interface NewProductFormState {
  success: boolean;
  message?: string;
  inputs?: Partial<Product>;
  errors?: {
    [K in keyof Product]?: string[];
  };
}

export default function Admin() {
  const [state, formAction, isPending] = useActionState<
    NewProductFormState,
    FormData
  >(AddNewProductAction, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Partial<Product>>({
    defaultValues: {
      title: state?.inputs?.title ?? undefined,
      description: state?.inputs?.description ?? undefined,
      category: state?.inputs?.category ?? undefined,
      price: state?.inputs?.price ?? undefined,
      availabilityStatus: state?.inputs?.availabilityStatus ?? undefined,
      returnPolicy: state?.inputs?.returnPolicy ?? undefined,
      tags: state?.inputs?.tags ?? [],
    },
  });

  const onSubmit = (data: Partial<Product>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) =>
          formData.append(
            key,
            typeof v === "string" || typeof v === "number"
              ? String(v)
              : String(v)
          )
        );
      } else if (value !== undefined && value !== null) {
        if (key === "price" && typeof value === "number") {
          formData.append(key, value.toString());
        } else if (typeof value === "string" || typeof value === "number") {
          formData.append(key, String(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });
    formAction(formData);
  };

  if (isPending) return <p>Loading...</p>;

  return (
    <main className="max-w-2xl mx-auto my-8 p-8 rounded-2xl shadow-lg border bg-slate-200">
      <h1 className="my-12 text-2xl font-bold text-center text-sky-950">
        Add a New Product
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Product Name"
          id="title"
          type="text"
          placeholder="e.g., Timeless Chronograph Watch"
          register={register("title", { required: "Product name is required" })}
          error={errors.title}
        />

        <InputField
          label="Description"
          id="description"
          placeholder="e.g., Elegant wristwatch with leather strap"
          register={register("description", {
            required: "Description is required",
          })}
          error={errors.description}
        />
        <div className="flex flex-col mb-4">
          <label htmlFor="title" className="font-semibold mb-2 text-sky-950">
            Product Name
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Product name is required" })}
            placeholder="e.g., Timeless Chronograph Watch"
            className="bg-slate-300 text-sky-950 placeholder:italic placeholder:text-slate-400 rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-slate-400 transition"
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-4">
          <label
            htmlFor="description"
            className="text-sky-950 font-semibold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="e.g., Elegant wristwatch with leather strap"
            className="bg-slate-300 text-sky-950 placeholder:italic placeholder:text-slate-400 rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-slate-400 transition"
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="category" className="text-sky-950 font-semibold mb-2">
            Category
          </label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className="bg-slate-300 text-sky-950 rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-slate-400 transition"
          >
            <option value="">Select category</option>
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-400 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="price" className="text-sky-950 font-semibold mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            {...register("price", {
              required: "Price is required",
              min: { value: 0.01, message: "Price must be positive" },
            })}
            placeholder="e.g., 199.99"
            className="bg-slate-300 text-sky-950 placeholder:italic placeholder:text-slate-400 rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-slate-400 transition"
          />
          {errors.price && (
            <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-4">
          <label
            htmlFor="availabilityStatus"
            className="text-sky-950 font-semibold mb-2"
          >
            Availability Status
          </label>
          <select
            id="availabilityStatus"
            {...register("availabilityStatus", {
              required: "Availability status is required",
            })}
            className="bg-slate-300 text-sky-950 rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-slate-400 transition"
          >
            <option value="">Select availability status</option>
            {allAvailabilityStatuses.map((statusKey) => (
              <option
                key={statusKey}
                value={
                  AvailabilityStatus[
                    statusKey as keyof typeof AvailabilityStatus
                  ]
                }
              >
                {
                  AvailabilityStatus[
                    statusKey as keyof typeof AvailabilityStatus
                  ]
                }
              </option>
            ))}
          </select>
          {errors.availabilityStatus && (
            <p className="text-red-400 text-sm mt-1">
              {errors.availabilityStatus.message}
            </p>
          )}
        </div>

        <div className="flex flex-col mb-4">
          <label
            htmlFor="returnPolicy"
            className="text-sky-950 font-semibold mb-2"
          >
            Return Policy
          </label>
          <select
            id="returnPolicy"
            {...register("returnPolicy", {
              required: "Return policy is required",
            })}
            className="bg-slate-300 text-sky-950 rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-slate-400 transition"
          >
            <option value="">Select return policy</option>
            {allReturnPolicies.map((policyKey) => (
              <option
                key={policyKey}
                value={ReturnPolicy[policyKey as keyof typeof ReturnPolicy]}
              >
                {ReturnPolicy[policyKey as keyof typeof ReturnPolicy]}
              </option>
            ))}
          </select>
          {errors.returnPolicy && (
            <p className="text-red-400 text-sm mt-1">
              {errors.returnPolicy.message}
            </p>
          )}
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="tags" className="text-sky-950 font-semibold mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-3">
            {allTags.map((tagKey) => (
              <div
                key={tagKey}
                className="bg-slate-300 text-sky-950 rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-slate-400 transition"
              >
                <input
                  type="checkbox"
                  id={`tag-${tagKey}`}
                  {...register("tags")}
                  value={Tag[tagKey as keyof typeof Tag]}
                  className="mr-2 bg-slate-300 "
                />
                <label htmlFor={`tag-${tagKey}`} className="text-sky-950">
                  {Tag[tagKey as keyof typeof Tag]}
                </label>
              </div>
            ))}
          </div>
          {errors.tags && (
            <p className="text-red-400 text-sm mt-1">{errors.tags.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg shadow-md transition"
        >
          Create Product
        </button>
      </form>
    </main>
  );
}
