"use client";
import { FieldError, useForm } from "react-hook-form";
import {
  Product,
  allCategories,
  allAvailabilityStatuses,
  allReturnPolicies,
  AvailabilityStatus,
  ReturnPolicy,
  allTags,
  Tag,
  Category,
} from "@/types/product";
import { useActionState } from "react";
import { AddNewProductAction } from "@/app/actions/admin/products";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import TagsCheckboxGroup from "@/components/common/TagsCheckboxGroup";
// import { QRCodeSVG } from "qrcode.react";

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
    watch,
    setValue,
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

  // const qrText = watch("meta.qrCode");

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
    <main className="max-w-sm md:max-w-md lg:max-w-3xl mx-auto my-8 p-8 rounded-2xl shadow-lg border bg-slate-50 mb-20">
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

        <SelectField
          label="Category"
          id="category"
          options={allCategories.map((category) => ({
            value: category,
            label: category,
          }))}
          value={watch("category") ?? ""}
          onChange={(val) => setValue("category", val as Category)}
          error={errors.category}
        />

        <InputField
          label="Price ($)"
          id="price"
          type="number"
          placeholder="e.g., 199.99"
          register={register("price", {
            required: "Price is required",
            min: { value: 0.01, message: "Price must be positive" },
          })}
          error={errors.price}
        />

        <InputField
          label="Discount Percentage (%)"
          id="discountPercentage"
          type="number"
          placeholder="e.g., 10"
          register={register("discountPercentage", {
            required: "Discount percentage is required",
            min: {
              value: 0.01,
              message: "Discount percentage must be positive",
            },
          })}
          error={errors.discountPercentage}
        />

        <InputField
          label="Stock"
          id="stock"
          type="number"
          placeholder="e.g., 100"
          register={register("stock", { required: "Stock is required" })}
          error={errors.stock}
        />

        <TagsCheckboxGroup
          label="Tags"
          tags={allTags.map((tagKey) => ({
            value: Tag[tagKey as keyof typeof Tag],
            label: Tag[tagKey as keyof typeof Tag],
          }))}
          register={register("tags")}
          error={errors.tags as FieldError | undefined}
        />

        <InputField
          label="Brand"
          id="brand"
          type="text"
          placeholder="e.g., Rolex"
          register={register("brand", { required: "Brand is required" })}
          error={errors.brand}
        />

        <InputField
          label="Weight (kg)"
          id="weight"
          type="number"
          placeholder="e.g., 100"
          register={register("weight", { required: "Weight is required" })}
          error={errors.weight}
        />

        <div className="flex gap-2 flex-col lg:flex-row">
          <InputField
            label="Width (sm)"
            id="dimensions.width"
            type="number"
            placeholder="e.g., 10"
            register={register("dimensions.width", {
              required: "Width is required",
            })}
            error={errors.dimensions?.width}
          />
          <InputField
            label="Height (sm)"
            id="dimensions.height"
            type="number"
            placeholder="e.g., 10"
            register={register("dimensions.height", {
              required: "Height is required",
            })}
            error={errors.dimensions?.height}
          />

          <InputField
            label="Depth (sm)"
            id="dimensions.depth"
            type="number"
            placeholder="e.g., 10"
            register={register("dimensions.depth", {
              required: "Depth is required",
            })}
            error={errors.dimensions?.depth}
          />
        </div>

        <InputField
          label="Warranty Information"
          id="warrantyInformation"
          type="string"
          placeholder="e.g., 12 month/no warranty"
          register={register("warrantyInformation", {
            required: "Warranty Information is required",
          })}
          error={errors.warrantyInformation}
        />

        <InputField
          label="Shipping Information"
          id="shippingInformation"
          type="string"
          placeholder="e.g., free shipping"
          register={register("shippingInformation", {
            required: "Shipping Information is required",
          })}
          error={errors.shippingInformation}
        />

        <SelectField
          label="Availability Status"
          id="availabilityStatus"
          options={allAvailabilityStatuses.map((statusKey) => ({
            value:
              AvailabilityStatus[statusKey as keyof typeof AvailabilityStatus],
            label:
              AvailabilityStatus[statusKey as keyof typeof AvailabilityStatus],
          }))}
          value={watch("availabilityStatus") ?? ""}
          onChange={(val) => setValue("availabilityStatus", val as AvailabilityStatus)}
          error={errors.availabilityStatus}
        />

        <SelectField
          label="Return Policy"
          id="returnPolicy"
          options={allReturnPolicies.map((policyKey) => ({
            value: ReturnPolicy[policyKey as keyof typeof ReturnPolicy],
            label: ReturnPolicy[policyKey as keyof typeof ReturnPolicy],
          }))}
          value={watch("returnPolicy") ?? ""}
          onChange={(val) => setValue("returnPolicy", val as ReturnPolicy)}
          error={errors.returnPolicy}
        />

        <InputField
          label="Minimum Order Quantity"
          id="minimumOrderQuantity"
          type="number"
          placeholder="e.g., 1"
          register={register("minimumOrderQuantity", {
            required: "Minimum order quantity is required",
            min: 1,
          })}
          error={errors.minimumOrderQuantity}
        />

        <InputField
          label="Barcode"
          id="meta.barcode"
          placeholder="Enter barcode"
          register={register("meta.barcode")}
          error={errors.meta?.barcode}
        />

        {/* 
          To be adder later with firebase storage
        
        {product?.meta?.qrCode && (
          <div className="my-4 text-center">
            <p className="mb-2 font-semibold text-slate-700">
              QR Code for product page:
            </p>
            <QRCodeSVG value={product.meta.qrCode} size={128} />
          </div>
        )} 

        <InputField
          label="Image 1 URL"
          id="images.0"
          placeholder="https://example.com/image1.jpg"
          register={register("images.0")}
          error={errors.images?.[0]}
        />

        <InputField
          label="Image 2 URL"
          id="images.1"
          placeholder="https://example.com/image2.jpg"
          register={register("images.1")}
          error={errors.images?.[1]}
        />
         */}

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
