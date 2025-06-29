"use client";

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
import Form from "next/form";

const initialState: NewProductFormState = {
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

  if (isPending) return <p>Loading...</p>;

  return (
    <main className="max-w-2xl mx-auto my-8 p-8 rounded-2xl shadow-lg border bg-slate-200">
      <h1 className="my-12 text-2xl font-bold text-center text-sky-950">
        Add a New Product
      </h1>
      <Form action={formAction}>
        <div className="flex flex-col mb-4">
          <label htmlFor="title" className="font-semibold mb-2 text-sky-950">
            Product Name
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g., Timeless Chronograph Watch"
            className="bg-slate-300 text-sky-950 placeholder:italic placeholder:text-slate-400 rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-slate-400 transition"
            defaultValue={state?.inputs?.title ?? ""}
          />
          {state?.errors?.title ? (
            <p className="text-red-400 text-sm mt-1">{state?.errors?.title}</p>
          ) : (
            <></>
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
            name="description"
            placeholder="e.g., Elegant wristwatch with leather strap"
            className="bg-slate-300 text-sky-950 placeholder:italic placeholder:text-slate-400 rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-slate-400 transition"
            defaultValue={state?.inputs?.description ?? ""}
          />
          {state?.errors?.description ? (
            <p className="text-red-400 text-sm mt-1">
              {state?.errors?.description}
            </p>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="category" className="text-sky-950 font-semibold mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="bg-slate-300 text-sky-950 rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-slate-400 transition"
            defaultValue={state?.inputs?.category ?? ""}
          >
            <option value="">Select category</option>
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {state?.errors?.category ? (
            <p className="text-red-400 text-sm mt-1">
              {state?.errors?.category}
            </p>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="price" className="text-sky-950 font-semibold mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="e.g., 199.99"
            className="bg-slate-300 text-sky-950 placeholder:italic placeholder:text-slate-400 rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-slate-400 transition"
            defaultValue={state?.inputs?.price ?? ""}
          />
          {state?.errors?.price ? (
            <p className="text-red-400 text-sm mt-1">{state?.errors?.price}</p>
          ) : (
            <></>
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
            name="availabilityStatus"
            className="bg-slate-300 text-sky-950 rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-slate-400 transition"
            defaultValue={state?.inputs?.availabilityStatus ?? ""}
          >
            <option value="">select availability status</option>
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
          {state?.errors?.availabilityStatus ? (
            <p className="text-red-400 text-sm mt-1">
              {state?.errors?.availabilityStatus}
            </p>
          ) : (
            <></>
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
            name="returnPolicy"
            className="bg-slate-300 text-sky-950 rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-slate-400 transition"
            defaultValue={state?.inputs?.returnPolicy ?? ""}
          >
            <option value="">select return policy</option>
            {allReturnPolicies.map((policyKey) => (
              <option
                key={policyKey}
                value={ReturnPolicy[policyKey as keyof typeof ReturnPolicy]}
              >
                {ReturnPolicy[policyKey as keyof typeof ReturnPolicy]}
              </option>
            ))}
          </select>
          {state?.errors?.returnPolicy ? (
            <p className="text-red-400 text-sm mt-1">
              {state?.errors?.returnPolicy}
            </p>
          ) : (
            <></>
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
                  name="tags"
                  value={Tag[tagKey as keyof typeof Tag]}
                  className="mr-2 bg-slate-300 "
                />
                <label htmlFor={`tag-${tagKey}`} className="text-sky-950">
                  {Tag[tagKey as keyof typeof Tag]}
                </label>
              </div>
            ))}
          </div>
          {state?.errors?.tags ? (
            <p className="text-red-400 text-sm mt-1">{state?.errors?.tags}</p>
          ) : (
            <></>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg shadow-md transition"
        >
          Create Product
        </button>
      </Form>
    </main>
  );
}
