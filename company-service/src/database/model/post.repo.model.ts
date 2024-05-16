import  { Schema ,model} from "mongoose";
const postingSchema: Schema = new Schema(
  {
    companyId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true, default: "" },
    requirements: { type: [String], required: true, default: [] },
    responsibilities: { type: [String], required: true, default: [] },
    people: { type: Number, required: true, default: 0 },
    location: { type: String, required: true, default: "" },
    duration: { type: Number, required: true, default: 0 },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    type: {
      type: String,
      enum: ["full-time", "part-time"],
      required: true,
      default: "full-time", 
    },
    available_position: { type: Number, required: true, default: 0 },
    language: { type: String, required: true, default: "" },
    deadline: { type: Date, required: true },
    salaries: { type: Number, required: true, default: 0 }, 
    createdAt: { type: Date },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Post =model("Post", postingSchema)

export { Post };
