import * as yup from 'yup';

export const validStatuses = ['approved', 'pending', 'rejected'];

export const validOrderSchema = yup.object().shape({
    userEmail: yup
        .string()
        .nullable(false)
        .email('Email is not valid')
        .required(),
    date: yup.date().required(),
    value: yup.number().required(),
    currency: yup.string().oneOf(['USD']),
    status: yup.string().oneOf(validStatuses, `Status should be one of "${validStatuses.join(', ')}"`),
});

export const validOrdersArray = yup.array().of(validOrderSchema);
