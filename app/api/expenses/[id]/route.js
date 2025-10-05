import { getAuthUser } from "@/lib/auth";
import { Expense } from "@/models/ExpenseModel";

export async function GET(_, {params}) {
  const {id} = await params;
  const user = await getAuthUser()

   if (user instanceof Response) {
    return user
  }

  const expense = await Expense.findOne({_id : id, userId: user.id});

  if(!expense){
    return Response.json({error : "Expense not found!"})
  }
  return Response.json(expense, {status : 200})
}

export async function DELETE(_, {params}) {
  const {id} = await params;
  const user = await getAuthUser()

   if (user instanceof Response) {
    return user
  }
  const expense = await Expense.findOneAndDelete({_id : id, userId: user.id});

  if(!expense){
    return Response.json({error : "Expense not found!"})
  }
  return Response.json({sucess : "Deleted Sucessfully"}, {status : 200})
}
