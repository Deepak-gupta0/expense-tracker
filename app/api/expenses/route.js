import { getAuthUser } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import { Expense } from "@/models/ExpenseModel";

export async function GET() {
  await connectDB()
  const user = await getAuthUser()

  if(user instanceof Response){
    return user
  }
  const expenses = await Expense.find({userId : user.id})
  
  if(!expenses){
    return Response.json({error : "Data not found"})
  }

  return Response.json(expenses.map(({id, amount, description, expenseType, time, date}) => ({id, amount, description, expenseType, date, time})), {
    status : 200
  })
}


export async function POST(request) {
  await connectDB();
  const user = await getAuthUser()

  if (user instanceof Response) {
    return user
  }

  const body = await request.json();

  const createExpense = await Expense.create({
    ...body,
    userId : user.id,
  });

  return Response.json(createExpense, {
    status: 201,
  });
}

