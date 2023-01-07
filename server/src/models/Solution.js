import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

const solutionSchema = new Schema(
  {
    solution: {
      type: String,
      required: true,
    },
    message: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Message',
        required: true,
    },
    organisation: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

solutionSchema.methods.toJSON = function () {
  console.log(this)
  return {
    id: this._id,
    solution: this.solution,
    message: this.message.toJSON(),
    organisation: this.organisation.toJSON(),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    user: this.user.toJSON(),
  };
};

export const validateMessage = (message) => {
  const schema = {
    solution: Joi.string().min(5).max(800).required(),
    message: Joi.string().required(),
    organisation: Joi.string().required(),
  };
  return Joi.validate(message, schema);
};

const Solution = mongoose.model('Solution', solutionSchema);

export default Solution;
