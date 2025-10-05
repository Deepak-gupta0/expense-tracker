import mongoose, { Schema } from "mongoose";

export const Expense =
  mongoose.models.Expense ||
  mongoose.model("Expense", {
    amount: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    expenseType: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    userId : {
      type : Schema.Types.ObjectId,
      required : true,
    }
  });
