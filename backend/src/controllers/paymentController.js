import { createPaymentdtoInSchema, createPaymentdtoOutSchema, getPaymentsByUserIdDtoInSchema, getPaymentsByUserIdDtoOutSchema,
    getPaymentsByProjectIdDtoInSchema, getPaymentsByProjectIdDtoOutSchema, updatePaymentStatusDtoInSchema, updatePaymentStatusDtoOutSchema
} from '../validations/paymentValidation.js';

const mockPayments = [
    {
      paymentId: "1",
      userId: "1",
      projectId: "1",
      amount: 50,
      createdAt: "2023-11-05T10:00:00Z",
      paymentStatus: "new"
    },
    {
      paymentId: "2",
      userId: "2",
      projectId: "1",
      amount: 150,
      createdAt: "2023-11-06T12:30:00Z",
      paymentStatus: "new"
    },
    {
      paymentId: "3",
      userId: "3",
      projectId: "2",
      amount: 200,
      createdAt: "2023-11-07T09:00:00Z",
      paymentStatus: "cancelled"
    }];

const createPayment = (req, res) => {

    const { error } = createPaymentdtoInSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Invalid input',
        details: error.details
      });
    }
  

    const paymentId = (mockPayments.length + 1).toString();
    const { userId, projectId, amount } = req.body;
    const createdAt = new Date().toISOString();
  

    const payment = {
      paymentId,
      userId,
      projectId,
      amount,
      createdAt
    };
  

    mockPayments.push(payment);
  

    const response = {
      paymentId,
      amount,
      createdAt
    };
  

    const { error: responseError } = createPaymentdtoOutSchema.validate(response);
    if (responseError) {
      return res.status(500).json({
        message: 'Error in response format',
        details: responseError.details
      });
    }
  
    return res.status(201).json(response);
  };

  

  const getPaymentsByUserId = (req, res) => {
    const { userId } = req.query; 

    const { error } = getPaymentsByUserIdDtoInSchema.validate({ userId });
    if (error) {
      return res.status(400).json({
        message: 'Invalid input',
        details: error.details
      });
    }
  
    const userPayments = mockPayments.filter(payment => payment.userId === userId);

    const { error: outError } = getPaymentsByUserIdDtoOutSchema.validate({ payments: userPayments });
    if (outError) {
      return res.status(500).json({
        message: 'Error validating data',
        details: outError.details
      });
    }
  

    res.status(200).json({
      payments: userPayments
    });
  };

  function getPaymentsByProjectId(req, res) {
    const input = req.query; 
    
  
    const { error: inputError } = getPaymentsByProjectIdDtoInSchema.validate(input);
    if (inputError) {
      return res.status(400).json({
        message: "Error validating input data",
        details: inputError.details
      });
    }
  

    const payments = mockPayments.filter(payment => payment.projectId === input.projectId);
  

    const output = {
        payments: payments.map(({ userId, ...rest }) => rest) 
    };
    const { error: outputError } = getPaymentsByProjectIdDtoOutSchema.validate(output);
    if (outputError) {
      return res.status(500).json({
        message: "Error validating output data",
        details: outputError.details
      });
    }
  
    return res.status(200).json(output);
  }

  function updatePaymentStatus(req, res) {
    const paymentId = req.query.paymentId; 
    const input = req.body; 
  

    const { error: inputError } = updatePaymentStatusDtoInSchema.validate(input);
    if (inputError) {
      return res.status(400).json({
        message: "Error validating input data",
        details: inputError.details
      });
    }
  

    const payment = mockPayments.find(p => p.paymentId === paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
  

    payment.paymentStatus = input.paymentStatus;
    
  

    const output = {
      amount: payment.amount,
      updatedAt: new Date().toISOString(),
      paymentStatus: payment.paymentStatus
    };
  

    const { error: outputError } = updatePaymentStatusDtoOutSchema.validate(output);
    if (outputError) {
      return res.status(500).json({
        message: "Error validating output data",
        details: outputError.details
      });
    }
  

    return res.status(200).json(output);
  }

export {createPayment, getPaymentsByUserId, getPaymentsByProjectId, updatePaymentStatus};
